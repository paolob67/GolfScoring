import {DefaultCrudRepository} from '@loopback/repository';
import {Hole, HoleRelations} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class HoleRepository extends DefaultCrudRepository<
  Hole,
  typeof Hole.prototype.HoleId,
  HoleRelations
> {
  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource,
  ) {
    super(Hole, dataSource);
  }
}
