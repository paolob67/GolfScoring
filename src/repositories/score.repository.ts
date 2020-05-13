import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Score, ScoreRelations, HoleScore, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {HoleScoreRepository} from './hole-score.repository';
import {UserRepository} from './user.repository';
import {LeaderboardRepository} from './leaderboard.repository';

export class ScoreRepository extends DefaultCrudRepository<
  Score,
  typeof Score.prototype.id,
  ScoreRelations
> {

  public readonly holeScores: HasManyRepositoryFactory<HoleScore, typeof Score.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Score.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('HoleScoreRepository') protected holeScoreRepositoryGetter: Getter<HoleScoreRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('LeaderboardRepository') protected leaderboardRepositoryGetter: Getter<LeaderboardRepository>,
  ) {
    super(Score, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.holeScores = this.createHasManyRepositoryFactoryFor('holeScores', holeScoreRepositoryGetter,);
    this.registerInclusionResolver('holeScores', this.holeScores.inclusionResolver);
  }

  public async updateScoreResults(id: string) {
    const filter = {fields: {holeNumber: true, marker: true, par: true}, order: ['holeNumber ASC']} 
    const scores = await this.holeScores(id).find(filter);
    let score: any ={};
    let leaderboardId: string;

    if (scores.length > 0) {
      let outHoles = 0;
      let inHoles = 0;
      let stroke = 0;
      let thru = 0;
      let total = 0;
      let net = 0;
      let stableford = 0;
      for (let i = 0; i < scores.length; i++) {
        let curHole = scores[i].holeNumber;
        let scoreMarker = scores[i].marker;
        let par = scores[i].par;
        if (scoreMarker !== undefined) {
          stroke += scoreMarker;
          net += scoreMarker - par;
          stableford += 2 - scoreMarker + par;
          total += scoreMarker - 4;
          thru += 1;
          if (curHole > 9) {
            inHoles += scoreMarker;
          } else if (curHole > 0) {
            outHoles += scoreMarker;
          }
        }
      }
      score.outHoles = outHoles;
      score.inHoles = inHoles;
      score.stroke = stroke;
      score.thru = thru;
      score.total = total;
      score.net = net;
      score.stableford = stableford;
      await this.updateById(id, score);
/*
      const filter = { fields: { leaderboardId: true}};
      leaderboardId = <any>await this.findById(id, filter);
      if (leaderboardId) {
        this.LeaderboardRepository.updateLeaderboardResults(leaderboardId);
      }
*/
    }

    return score;
  }
}
