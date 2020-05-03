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
  Slope,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseSlopeController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/slopes', {
    responses: {
      '200': {
        description: 'Array of Course has many Slope',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Slope)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Slope>,
  ): Promise<Slope[]> {
    return this.courseRepository.slopes(id).find(filter);
  }

  @post('/courses/{id}/slopes', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Slope)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slope, {
            title: 'NewSlopeInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) slope: Omit<Slope, 'id'>,
  ): Promise<Slope> {
    return this.courseRepository.slopes(id).create(slope);
  }

  @patch('/courses/{id}/slopes', {
    responses: {
      '200': {
        description: 'Course.Slope PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slope, {partial: true}),
        },
      },
    })
    slope: Partial<Slope>,
    @param.query.object('where', getWhereSchemaFor(Slope)) where?: Where<Slope>,
  ): Promise<Count> {
    return this.courseRepository.slopes(id).patch(slope, where);
  }

  @del('/courses/{id}/slopes', {
    responses: {
      '200': {
        description: 'Course.Slope DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Slope)) where?: Where<Slope>,
  ): Promise<Count> {
    return this.courseRepository.slopes(id).delete(where);
  }
}
