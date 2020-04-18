import {DefaultCrudRepository} from '@loopback/repository';
import {Event, EventRelations} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.EventId,
  EventRelations
> {
  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource,
  ) {
    super(Event, dataSource);
  }
}
