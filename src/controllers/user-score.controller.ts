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
  Score,
} from '../models';
import {UserRepository} from '../repositories';

export class UserScoreController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/scores', {
    responses: {
      '200': {
        description: 'Array of User has many Score',
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
    return this.userRepository.scores(id).find(filter);
  }

  @post('/users/{id}/scores', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Score)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {
            title: 'NewScoreInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) score: Omit<Score, 'id'>,
  ): Promise<Score> {
    return this.userRepository.scores(id).create(score);
  }

  @patch('/users/{id}/scores', {
    responses: {
      '200': {
        description: 'User.Score PATCH success count',
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
    return this.userRepository.scores(id).patch(score, where);
  }

  @del('/users/{id}/scores', {
    responses: {
      '200': {
        description: 'User.Score DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Score)) where?: Where<Score>,
  ): Promise<Count> {
    return this.userRepository.scores(id).delete(where);
  }
}
