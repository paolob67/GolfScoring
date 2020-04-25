import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, Score} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ScoreRepository} from './score.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly scores: HasManyRepositoryFactory<Score, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ScoreRepository') protected scoreRepositoryGetter: Getter<ScoreRepository>,
  ) {
    super(Event, dataSource);
    this.scores = this.createHasManyRepositoryFactoryFor('scores', scoreRepositoryGetter,);
    this.registerInclusionResolver('scores', this.scores.inclusionResolver);
  }
}
