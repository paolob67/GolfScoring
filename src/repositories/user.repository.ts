import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Address} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AddressRepository} from './address.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.email,
  UserRelations
> {

  public readonly UserAddress: HasOneRepositoryFactory<Address, typeof User.prototype.email>;

  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(User, dataSource);
    this.UserAddress = this.createHasOneRepositoryFactoryFor('UserAddress', addressRepositoryGetter);
    this.registerInclusionResolver('UserAddress', this.UserAddress.inclusionResolver);
  }
}
