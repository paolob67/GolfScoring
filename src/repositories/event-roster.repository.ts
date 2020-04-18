import {DefaultCrudRepository} from '@loopback/repository';
import {EventRoster, EventRosterRelations} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EventRosterRepository extends DefaultCrudRepository<
  EventRoster,
  typeof EventRoster.prototype.EventRosterId,
  EventRosterRelations
> {
  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource,
  ) {
    super(EventRoster, dataSource);
  }
}
