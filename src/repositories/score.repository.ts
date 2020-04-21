import {DefaultCrudRepository} from '@loopback/repository';
import {Score, ScoreRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ScoreRepository extends DefaultCrudRepository<
  Score,
  typeof Score.prototype.ScoreId,
  ScoreRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Score, dataSource);
  }
}
