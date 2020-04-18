import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, Course, EventRoster} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CourseRepository} from './course.repository';
import {EventRosterRepository} from './event-roster.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.EventId,
  EventRelations
> {

  public readonly CourseId: HasOneRepositoryFactory<Course, typeof Event.prototype.EventId>;

  public readonly eventRosters: HasManyRepositoryFactory<EventRoster, typeof Event.prototype.EventId>;

  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>, @repository.getter('EventRosterRepository') protected eventRosterRepositoryGetter: Getter<EventRosterRepository>,
  ) {
    super(Event, dataSource);
    this.eventRosters = this.createHasManyRepositoryFactoryFor('eventRosters', eventRosterRepositoryGetter,);
    this.registerInclusionResolver('eventRosters', this.eventRosters.inclusionResolver);
    this.CourseId = this.createHasOneRepositoryFactoryFor('CourseId', courseRepositoryGetter);
    this.registerInclusionResolver('CourseId', this.CourseId.inclusionResolver);
  }
}
