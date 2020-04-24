import {DefaultCrudRepository} from '@loopback/repository';
import {Hole, HoleRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HoleRepository extends DefaultCrudRepository<
  Hole,
  typeof Hole.prototype.id,
  HoleRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Hole, dataSource);
  }
}
