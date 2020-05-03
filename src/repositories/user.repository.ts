// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
// import {Order, User, UserCredentials} from '../models';
import {User, UserCredentials, Score, Leaderboard} from '../models';
// import {OrderRepository} from './order.repository';
import {UserCredentialsRepository} from './user-credentials.repository';
import {ScoreRepository} from './score.repository';
import {LeaderboardRepository} from './leaderboard.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {



  // public orders: HasManyRepositoryFactory<Order, typeof User.prototype.id>;
  public readonly scores: HasManyRepositoryFactory<Score, typeof User.prototype.id>;

  public readonly leaderboard: HasManyRepositoryFactory<Leaderboard, typeof User.prototype.id>;
  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
  //public readonly userCredentials: HasOneRepositoryFactory<
  //  UserCredentials,
  //  typeof User.prototype.id
  //>;

  constructor(
    @inject('datasources.mongo') dataSource: juggler.DataSource,

    // @repository(OrderRepository) protected orderRepository: OrderRepository,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<
      UserCredentialsRepository
    >, @repository.getter('ScoreRepository') protected scoreRepositoryGetter: Getter<ScoreRepository>, @repository.getter('LeaderboardRepository') protected leaderboardRepositoryGetter: Getter<LeaderboardRepository>,
  ) {
    super(User, dataSource);
    this.leaderboard = this.createHasManyRepositoryFactoryFor('leaderboard', leaderboardRepositoryGetter,);
    this.registerInclusionResolver('leaderboard', this.leaderboard.inclusionResolver);
    this.scores = this.createHasManyRepositoryFactoryFor('scores', scoreRepositoryGetter,);
    this.registerInclusionResolver('scores', this.scores.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
    //this.userCredentials = this.createHasOneRepositoryFactoryFor(
    //  'userCredentials',
    //  userCredentialsRepositoryGetter,
    //);
    // this.orders = this.createHasManyRepositoryFactoryFor(
    //   'orders',
    //   async () => orderRepository,
    // );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
