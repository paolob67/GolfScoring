import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Address, EventRoster} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AddressRepository} from './address.repository';
import {EventRosterRepository} from './event-roster.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.email,
  UserRelations
> {

  public readonly UserAddress: HasOneRepositoryFactory<Address, typeof User.prototype.email>;

  public readonly eventRosters: HasManyRepositoryFactory<EventRoster, typeof User.prototype.email>;

  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('EventRosterRepository') protected eventRosterRepositoryGetter: Getter<EventRosterRepository>,
  ) {
    super(User, dataSource);
    this.eventRosters = this.createHasManyRepositoryFactoryFor('eventRosters', eventRosterRepositoryGetter,);
    this.UserAddress = this.createHasOneRepositoryFactoryFor('UserAddress', addressRepositoryGetter);
    this.registerInclusionResolver('UserAddress', this.UserAddress.inclusionResolver);
  }
}
