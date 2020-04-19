import {DefaultCrudRepository} from '@loopback/repository';
import {Player, PlayerRelations} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.Email,
  PlayerRelations
> {
  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource,
  ) {
    super(Player, dataSource);
  }
}
