import {Entity, model, property} from '@loopback/repository';

@model()
export class Player extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Email: string;

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
  ClubName?: string;

  @property({
    type: 'string',
  })
  CardNumber?: string;

  @property({
    type: 'number',
  })
  Handicap?: number;

  @property({
    type: 'string',
  })
  Gender?: number;

  /*
  @property({
    name: 'UserAddress',
  })
  UserAddress?: Address;
  */

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

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
