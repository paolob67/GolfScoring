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
  Course,
  Address,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseAddressController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/address', {
    responses: {
      '200': {
        description: 'Course has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.courseRepository.address(id).get(filter);
  }

  @post('/courses/{id}/address', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Course.prototype.CourseId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInCourse',
            exclude: ['AddressId'],
            optional: ['courseId']
          }),
        },
      },
    }) address: Omit<Address, 'AddressId'>,
  ): Promise<Address> {
    return this.courseRepository.address(id).create(address);
  }

  @patch('/courses/{id}/address', {
    responses: {
      '200': {
        description: 'Course.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.courseRepository.address(id).patch(address, where);
  }

  @del('/courses/{id}/address', {
    responses: {
      '200': {
        description: 'Course.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.courseRepository.address(id).delete(where);
  }
}
