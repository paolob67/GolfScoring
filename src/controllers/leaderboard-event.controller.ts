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
  Event,
} from '../models';
import {LeaderboardRepository} from '../repositories';

export class LeaderboardEventController {
  constructor(
    @repository(LeaderboardRepository)
    public leaderboardRepository: LeaderboardRepository,
  ) { }

  @get('/leaderboard/{id}/event', {
    responses: {
      '200': {
        description: 'Event belonging to Leaderboard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Event)},
          },
        },
      },
    },
  })
  async getEvent(
    @param.path.string('id') id: typeof Leaderboard.prototype.id,
  ): Promise<Event> {
    return this.leaderboardRepository.event(id);
  }
}
