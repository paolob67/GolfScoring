import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Leaderboard,
  Score,
} from '../models';
import {LeaderboardRepository} from '../repositories';

export class LeaderboardScoreController {
  constructor(
    @repository(LeaderboardRepository) protected leaderboardRepository: LeaderboardRepository,
  ) { }

  @get('/leaderboard/{id}/update', {
    responses: {
      '200': {
        description: 'Updated metadata for Leaderboard',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Leaderboard)
          },
        },
      },
    },
  })
  async update(
    @param.path.string('id') id: string,
  ): Promise<Leaderboard> {

    const filter = {fields: {round: true, stroke: true, thru: true, total: true}, order: ['round ASC']} 
    const scores = await this.leaderboardRepository.scores(id).find(filter);
    let leaderboard: any ={};
    if (scores.length > 0) {
      console.log('\n> scores' + JSON.stringify(scores));
      let stroke = 0;
      let total = 0;
      leaderboard.thru = scores[scores.length-1].thru;
      leaderboard.today = scores[scores.length-1].total;
      for (let i = 0; i < scores.length; i++) {
        let scoreRound = scores[i].round;
        let scoreStroke = scores[i].stroke;
        let scoreTotal = scores[i].total;
        if (scoreTotal !== undefined && scoreStroke !== undefined) {
          stroke += scoreStroke;
          total += scoreTotal;
          switch (scoreRound) {
              case 1:
                  leaderboard.day1Stroke = scoreStroke;
                  break;
              case 2:
                  leaderboard.day2Stroke = scoreStroke;
                  break;
              case 3:
                  leaderboard.day3Stroke = scoreStroke;
                  break;
              case 4:
                  leaderboard.day4Stroke = scoreStroke;
                  break;
              default:
                  console.log("No such round exists!");
                  break;
          }
        }
      }
      leaderboard.stroke = stroke;
      leaderboard.total = total;
      await this.leaderboardRepository.updateById(id, leaderboard);
    }
    return leaderboard;
  }

  @get('/leaderboard/{id}/scores', {
    responses: {
      '200': {
        description: 'Array of Leaderboard has many Score',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Score)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Score>,
  ): Promise<Score[]> {
    return this.leaderboardRepository.scores(id).find(filter);
  }

  @post('/leaderboard/{id}/scores', {
    responses: {
      '200': {
        description: 'Leaderboard model instance',
        content: {'application/json': {schema: getModelSchemaRef(Score)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Leaderboard.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {
            title: 'NewScoreInLeaderboard',
            exclude: ['id'],
            optional: ['leaderboardId']
          }),
        },
      },
    }) score: Omit<Score, 'id'>,
  ): Promise<Score> {
    return this.leaderboardRepository.scores(id).create(score);
  }

  @patch('/leaderboard/{id}/scores', {
    responses: {
      '200': {
        description: 'Leaderboard.Score PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {partial: true}),
        },
      },
    })
    score: Partial<Score>,
    @param.query.object('where', getWhereSchemaFor(Score)) where?: Where<Score>,
  ): Promise<Count> {
    return this.leaderboardRepository.scores(id).patch(score, where);
  }

  @del('/leaderboard/{id}/scores', {
    responses: {
      '200': {
        description: 'Leaderboard.Score DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Score)) where?: Where<Score>,
  ): Promise<Count> {
    return this.leaderboardRepository.scores(id).delete(where);
  }
}
