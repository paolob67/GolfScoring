import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Score, ScoreRelations, HoleScore} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {HoleScoreRepository} from './hole-score.repository';

export class ScoreRepository extends DefaultCrudRepository<
  Score,
  typeof Score.prototype.id,
  ScoreRelations
> {

  public readonly holeScores: HasManyRepositoryFactory<HoleScore, typeof Score.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('HoleScoreRepository') protected holeScoreRepositoryGetter: Getter<HoleScoreRepository>,
  ) {
    super(Score, dataSource);
    this.holeScores = this.createHasManyRepositoryFactoryFor('holeScores', holeScoreRepositoryGetter,);
    this.registerInclusionResolver('holeScores', this.holeScores.inclusionResolver);
  }
}
