import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Leaderboard,
  User,
} from '../models';
import {LeaderboardRepository} from '../repositories';

export class LeaderboardUserController {
  constructor(
    @repository(LeaderboardRepository)
    public leaderboardRepository: LeaderboardRepository,
  ) { }

  @get('/leaderboard/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Leaderboard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Leaderboard.prototype.id,
  ): Promise<User> {
    return this.leaderboardRepository.user(id);
  }
}
