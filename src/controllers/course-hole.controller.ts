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
  Hole,
} from '../models';
import {CourseRepository} from '../repositories';

export class CourseHoleController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) { }

  @get('/courses/{id}/holes', {
    responses: {
      '200': {
        description: 'Array of Course has many Hole',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Hole)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Hole>,
  ): Promise<Hole[]> {
    return this.courseRepository.holes(id).find(filter);
  }

  @post('/courses/{id}/holes', {
    responses: {
      '200': {
        description: 'Course model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hole)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hole, {
            title: 'NewHoleInCourse',
            exclude: ['id'],
            optional: ['courseId']
          }),
        },
      },
    }) hole: Omit<Hole, 'id'>,
  ): Promise<Hole> {
    return this.courseRepository.holes(id).create(hole);
  }

  @patch('/courses/{id}/holes', {
    responses: {
      '200': {
        description: 'Course.Hole PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hole, {partial: true}),
        },
      },
    })
    hole: Partial<Hole>,
    @param.query.object('where', getWhereSchemaFor(Hole)) where?: Where<Hole>,
  ): Promise<Count> {
    return this.courseRepository.holes(id).patch(hole, where);
  }

  @del('/courses/{id}/holes', {
    responses: {
      '200': {
        description: 'Course.Hole DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hole)) where?: Where<Hole>,
  ): Promise<Count> {
    return this.courseRepository.holes(id).delete(where);
  }
}
