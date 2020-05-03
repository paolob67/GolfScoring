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
  User,
  Leaderboard,
} from '../models';
import {UserRepository} from '../repositories';

export class UserLeaderboardController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'Array of User has many Leaderboard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Leaderboard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Leaderboard>,
  ): Promise<Leaderboard[]> {
    return this.userRepository.leaderboard(id).find(filter);
  }

  @post('/users/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Leaderboard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {
            title: 'NewLeaderboardInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) leaderboard: Omit<Leaderboard, 'id'>,
  ): Promise<Leaderboard> {
    return this.userRepository.leaderboard(id).create(leaderboard);
  }

  @patch('/users/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'User.Leaderboard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {partial: true}),
        },
      },
    })
    leaderboard: Partial<Leaderboard>,
    @param.query.object('where', getWhereSchemaFor(Leaderboard)) where?: Where<Leaderboard>,
  ): Promise<Count> {
    return this.userRepository.leaderboard(id).patch(leaderboard, where);
  }

  @del('/users/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'User.Leaderboard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Leaderboard)) where?: Where<Leaderboard>,
  ): Promise<Count> {
    return this.userRepository.leaderboard(id).delete(where);
  }
}
