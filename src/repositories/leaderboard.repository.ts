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
}
