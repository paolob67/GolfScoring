import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Address,
} from '../models';
import {UserRepository} from '../repositories';

export class UserAddressController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/address', {
    responses: {
      '200': {
        description: 'User has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.userRepository.UserAddress(id).get(filter);
  }

  @post('/users/{id}/address', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.email,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInUser',
            exclude: ['AddressId'],
            optional: ['userId']
          }),
        },
      },
    }) address: Omit<Address, 'AddressId'>,
  ): Promise<Address> {
    return this.userRepository.UserAddress(id).create(address);
  }

  @patch('/users/{id}/address', {
    responses: {
      '200': {
        description: 'User.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.userRepository.UserAddress(id).patch(address, where);
  }

  @del('/users/{id}/address', {
    responses: {
      '200': {
        description: 'User.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.userRepository.UserAddress(id).delete(where);
  }
}
