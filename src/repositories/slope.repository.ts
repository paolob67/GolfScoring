import {DefaultCrudRepository} from '@loopback/repository';
import {Slope, SlopeRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SlopeRepository extends DefaultCrudRepository<
  Slope,
  typeof Slope.prototype.id,
  SlopeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Slope, dataSource);
  }
}
