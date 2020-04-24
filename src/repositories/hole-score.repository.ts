import {DefaultCrudRepository} from '@loopback/repository';
import {HoleScore, HoleScoreRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HoleScoreRepository extends DefaultCrudRepository<
  HoleScore,
  typeof HoleScore.prototype.id,
  HoleScoreRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(HoleScore, dataSource);
  }
}
