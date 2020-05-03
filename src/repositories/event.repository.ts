import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, Score, Leaderboard} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ScoreRepository} from './score.repository';
import {LeaderboardRepository} from './leaderboard.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly scores: HasManyRepositoryFactory<Score, typeof Event.prototype.id>;

  public readonly leaderboard: HasManyRepositoryFactory<Leaderboard, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ScoreRepository') protected scoreRepositoryGetter: Getter<ScoreRepository>, @repository.getter('LeaderboardRepository') protected leaderboardRepositoryGetter: Getter<LeaderboardRepository>,
  ) {
    super(Event, dataSource);
    this.leaderboard = this.createHasManyRepositoryFactoryFor('leaderboard', leaderboardRepositoryGetter,);
    this.registerInclusionResolver('leaderboard', this.leaderboard.inclusionResolver);
    this.scores = this.createHasManyRepositoryFactoryFor('scores', scoreRepositoryGetter,);
    this.registerInclusionResolver('scores', this.scores.inclusionResolver);
  }
}
