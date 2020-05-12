import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Score, ScoreRelations, HoleScore, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {HoleScoreRepository} from './hole-score.repository';
import {UserRepository} from './user.repository';

export class ScoreRepository extends DefaultCrudRepository<
  Score,
  typeof Score.prototype.id,
  ScoreRelations
> {

  public readonly holeScores: HasManyRepositoryFactory<HoleScore, typeof Score.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Score.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('HoleScoreRepository') protected holeScoreRepositoryGetter: Getter<HoleScoreRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Score, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.holeScores = this.createHasManyRepositoryFactoryFor('holeScores', holeScoreRepositoryGetter,);
    this.registerInclusionResolver('holeScores', this.holeScores.inclusionResolver);
  }
}
