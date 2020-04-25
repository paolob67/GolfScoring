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
  Score,
  HoleScore,
} from '../models';
import {ScoreRepository} from '../repositories';

export class ScoreHoleScoreController {
  constructor(
    @repository(ScoreRepository) protected scoreRepository: ScoreRepository,
  ) { }

  @get('/scores/{id}/hole-scores', {
    responses: {
      '200': {
        description: 'Array of Score has many HoleScore',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HoleScore)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HoleScore>,
  ): Promise<HoleScore[]> {
    return this.scoreRepository.holeScores(id).find(filter);
  }

  @post('/scores/{id}/hole-scores', {
    responses: {
      '200': {
        description: 'Score model instance',
        content: {'application/json': {schema: getModelSchemaRef(HoleScore)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Score.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HoleScore, {
            title: 'NewHoleScoreInScore',
            exclude: ['id'],
            optional: ['scoreId']
          }),
        },
      },
    }) holeScore: Omit<HoleScore, 'id'>,
  ): Promise<HoleScore> {
    return this.scoreRepository.holeScores(id).create(holeScore);
  }

  @patch('/scores/{id}/hole-scores', {
    responses: {
      '200': {
        description: 'Score.HoleScore PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HoleScore, {partial: true}),
        },
      },
    })
    holeScore: Partial<HoleScore>,
    @param.query.object('where', getWhereSchemaFor(HoleScore)) where?: Where<HoleScore>,
  ): Promise<Count> {
    return this.scoreRepository.holeScores(id).patch(holeScore, where);
  }

  @del('/scores/{id}/hole-scores', {
    responses: {
      '200': {
        description: 'Score.HoleScore DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HoleScore)) where?: Where<HoleScore>,
  ): Promise<Count> {
    return this.scoreRepository.holeScores(id).delete(where);
  }
}
