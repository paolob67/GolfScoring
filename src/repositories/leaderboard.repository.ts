import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Leaderboard, LeaderboardRelations, Event, Course, User, Score} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EventRepository} from './event.repository';
import {CourseRepository} from './course.repository';
import {UserRepository} from './user.repository';
import {ScoreRepository} from './score.repository';

export class LeaderboardRepository extends DefaultCrudRepository<
  Leaderboard,
  typeof Leaderboard.prototype.id,
  LeaderboardRelations
> {

  public readonly event: BelongsToAccessor<Event, typeof Leaderboard.prototype.id>;

  public readonly course: BelongsToAccessor<Course, typeof Leaderboard.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Leaderboard.prototype.id>;

  public readonly scores: HasManyRepositoryFactory<Score, typeof Leaderboard.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ScoreRepository') protected scoreRepositoryGetter: Getter<ScoreRepository>, 
  ) {
    super(Leaderboard, dataSource);
    this.scores = this.createHasManyRepositoryFactoryFor('scores', scoreRepositoryGetter,);
    this.registerInclusionResolver('scores', this.scores.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.course = this.createBelongsToAccessorFor('course', courseRepositoryGetter,);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
    this.event = this.createBelongsToAccessorFor('event', eventRepositoryGetter,);
    this.registerInclusionResolver('event', this.event.inclusionResolver);
  }

  public async updateLeaderboardResults(id: string) {

    const filter = {fields: {round: true, stroke: true, thru: true, total: true}, order: ['round ASC']} 
    const scores = await this.scores(id).find(filter);
    let leaderboard: any ={};
    if (scores.length > 0) {
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
      await this.updateById(id, leaderboard);
    }

    return leaderboard;
  }

}
