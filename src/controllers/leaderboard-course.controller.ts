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
  Course,
} from '../models';
import {LeaderboardRepository} from '../repositories';

export class LeaderboardCourseController {
  constructor(
    @repository(LeaderboardRepository)
    public leaderboardRepository: LeaderboardRepository,
  ) { }

  @get('/leaderboard/{id}/course', {
    responses: {
      '200': {
        description: 'Course belonging to Leaderboard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Course)},
          },
        },
      },
    },
  })
  async getCourse(
    @param.path.string('id') id: typeof Leaderboard.prototype.id,
  ): Promise<Course> {
    return this.leaderboardRepository.course(id);
  }
}
