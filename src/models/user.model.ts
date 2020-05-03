// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
// import {Order} from './order.model';
import {UserCredentials} from './user-credentials.model';
import {Score} from './score.model';
import {HoleScore} from './hole-score.model';
import {Leaderboard} from './leaderboard.model';

// import {ShoppingCart} from './shopping-cart.model';

@model({
  settings: {
//    strictObjectIDCoercion: true,
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  clubName?: string;

  @property({
    type: 'string',
  })
  card?: string;

  @property({
    type: 'number',
    default: 1,
  })
  handicap?: number;

  @property({
    type: 'string',
  })
  gender?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];


  // @hasMany(() => Order)
  @hasMany(() => Score)
  scores: Score[];

  @hasMany(() => HoleScore, {keyTo: 'markerId'})
  scoreMarks: HoleScore[];

  @hasMany(() => Leaderboard)
  leaderboard: Leaderboard[];
  // orders: Order[];
  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  //@hasOne(() => UserCredentials)
  //userCredentials: UserCredentials;

  // @hasOne(() => ShoppingCart)
  // shoppingCart: ShoppingCart;


  constructor(data?: Partial<User>) {
    super(data);
  }
}
