import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Score,
  User,
} from '../models';
import {ScoreRepository} from '../repositories';

export class ScoreUserController {
  constructor(
    @repository(ScoreRepository)
    public scoreRepository: ScoreRepository,
  ) { }

  @get('/scores/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Score',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Score.prototype.id,
  ): Promise<User> {
    return this.scoreRepository.user(id);
  }
}
