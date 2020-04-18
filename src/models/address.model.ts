import {Model, model, property} from '@loopback/repository';

@model()
export class Address extends Model {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  AddressId?: number;

  @property({
    type: 'string',
    required: true,
  })
  Street: string;

  @property({
    type: 'string',
  })
  Civic?: string;

  @property({
    type: 'string',
  })
  City?: string;

  @property({
    type: 'string',
  })
  Province?: string;

  @property({
    type: 'string',
  })
  PostCode?: string;

  @property({
    type: 'string',
  })
  Country?: string;


  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
