import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Course, CourseRelations, Address, Hole, Event, Leaderboard, Slope} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AddressRepository} from './address.repository';
import {HoleRepository} from './hole.repository';
import {EventRepository} from './event.repository';
import {LeaderboardRepository} from './leaderboard.repository';
import {SlopeRepository} from './slope.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Course.prototype.id>;

  public readonly holes: HasManyRepositoryFactory<Hole, typeof Course.prototype.id>;

  public readonly events: HasManyRepositoryFactory<Event, typeof Course.prototype.id>;

  public readonly leaderboard: HasManyRepositoryFactory<Leaderboard, typeof Course.prototype.id>;

  public readonly slopes: HasManyRepositoryFactory<Slope, typeof Course.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('HoleRepository') protected holeRepositoryGetter: Getter<HoleRepository>, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>, @repository.getter('LeaderboardRepository') protected leaderboardRepositoryGetter: Getter<LeaderboardRepository>, @repository.getter('SlopeRepository') protected slopeRepositoryGetter: Getter<SlopeRepository>,
  ) {
    super(Course, dataSource);
    this.slopes = this.createHasManyRepositoryFactoryFor('slopes', slopeRepositoryGetter,);
    this.registerInclusionResolver('slopes', this.slopes.inclusionResolver);
    this.leaderboard = this.createHasManyRepositoryFactoryFor('leaderboard', leaderboardRepositoryGetter,);
    this.registerInclusionResolver('leaderboard', this.leaderboard.inclusionResolver);
    this.events = this.createHasManyRepositoryFactoryFor('events', eventRepositoryGetter,);
    this.registerInclusionResolver('events', this.events.inclusionResolver);
    this.holes = this.createHasManyRepositoryFactoryFor('holes', holeRepositoryGetter,);
    this.registerInclusionResolver('holes', this.holes.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
