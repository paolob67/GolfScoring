import {Entity, model, property, hasOne} from '@loopback/repository';
import {Address} from './address.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  FirstName: string;

  @property({
    type: 'string',
    required: true,
  })
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  PasswordHash: string;

  @property({
    type: 'string',
  })
  CardNumber?: string;

  @property({
    type: 'number',
  })
  CurrentScore?: number;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  IsCoach: boolean;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  IsParent: boolean;

  @hasOne(() => Address)
  UserAddress: Address;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
