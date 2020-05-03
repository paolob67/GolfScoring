import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Leaderboard} from '../models';
import {LeaderboardRepository} from '../repositories';

export class LeaderboardController {
  constructor(
    @repository(LeaderboardRepository)
    public leaderboardRepository : LeaderboardRepository,
  ) {}

  @post('/leaderbord', {
    responses: {
      '200': {
        description: 'Leaderboard model instance',
        content: {'application/json': {schema: getModelSchemaRef(Leaderboard)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {
            title: 'NewLeaderboard',
            exclude: ['id'],
          }),
        },
      },
    })
    leaderboard: Omit<Leaderboard, 'id'>,
  ): Promise<Leaderboard> {
    return this.leaderboardRepository.create(leaderboard);
  }

  @get('/leaderbord/count', {
    responses: {
      '200': {
        description: 'Leaderboard model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Leaderboard) where?: Where<Leaderboard>,
  ): Promise<Count> {
    return this.leaderboardRepository.count(where);
  }

  @get('/leaderbord', {
    responses: {
      '200': {
        description: 'Array of Leaderboard model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Leaderboard, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Leaderboard) filter?: Filter<Leaderboard>,
  ): Promise<Leaderboard[]> {
    return this.leaderboardRepository.find(filter);
  }

  @patch('/leaderbord', {
    responses: {
      '200': {
        description: 'Leaderboard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {partial: true}),
        },
      },
    })
    leaderboard: Leaderboard,
    @param.where(Leaderboard) where?: Where<Leaderboard>,
  ): Promise<Count> {
    return this.leaderboardRepository.updateAll(leaderboard, where);
  }

  @get('/leaderbord/{id}', {
    responses: {
      '200': {
        description: 'Leaderboard model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Leaderboard, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Leaderboard, {exclude: 'where'}) filter?: FilterExcludingWhere<Leaderboard>
  ): Promise<Leaderboard> {
    return this.leaderboardRepository.findById(id, filter);
  }

  @patch('/leaderbord/{id}', {
    responses: {
      '204': {
        description: 'Leaderboard PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {partial: true}),
        },
      },
    })
    leaderboard: Leaderboard,
  ): Promise<void> {
    await this.leaderboardRepository.updateById(id, leaderboard);
  }

  @put('/leaderbord/{id}', {
    responses: {
      '204': {
        description: 'Leaderboard PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() leaderboard: Leaderboard,
  ): Promise<void> {
    await this.leaderboardRepository.replaceById(id, leaderboard);
  }

  @del('/leaderbord/{id}', {
    responses: {
      '204': {
        description: 'Leaderboard DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.leaderboardRepository.deleteById(id);
  }
}
