import {DefaultCrudRepository} from '@loopback/repository';
import {Address, AddressRelations} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.AddressId,
  AddressRelations
> {
  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource,
  ) {
    super(Address, dataSource);
  }
}
