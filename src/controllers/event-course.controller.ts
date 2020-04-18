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
  Event,
  Course,
} from '../models';
import {EventRepository} from '../repositories';

export class EventCourseController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/course', {
    responses: {
      '200': {
        description: 'Event has one Course',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Course),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Course>,
  ): Promise<Course> {
    return this.eventRepository.CourseId(id).get(filter);
  }

  @post('/events/{id}/course', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(Course)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Event.prototype.EventId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {
            title: 'NewCourseInEvent',
            exclude: ['CourseId'],
            optional: ['eventId']
          }),
        },
      },
    }) course: Omit<Course, 'CourseId'>,
  ): Promise<Course> {
    return this.eventRepository.CourseId(id).create(course);
  }

  @patch('/events/{id}/course', {
    responses: {
      '200': {
        description: 'Event.Course PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {partial: true}),
        },
      },
    })
    course: Partial<Course>,
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
  ): Promise<Count> {
    return this.eventRepository.CourseId(id).patch(course, where);
  }

  @del('/events/{id}/course', {
    responses: {
      '200': {
        description: 'Event.Course DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Course)) where?: Where<Course>,
  ): Promise<Count> {
    return this.eventRepository.CourseId(id).delete(where);
  }
}
