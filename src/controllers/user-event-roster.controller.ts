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
  EventRoster,
} from '../models';
import {UserRepository} from '../repositories';

export class UserEventRosterController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'Array of User has many EventRoster',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventRoster)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EventRoster>,
  ): Promise<EventRoster[]> {
    return this.userRepository.eventRosters(id).find(filter);
  }

  @post('/users/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventRoster)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.email,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventRoster, {
            title: 'NewEventRosterInUser',
            exclude: ['EventRosterId'],
            optional: ['userId']
          }),
        },
      },
    }) eventRoster: Omit<EventRoster, 'EventRosterId'>,
  ): Promise<EventRoster> {
    return this.userRepository.eventRosters(id).create(eventRoster);
  }

  @patch('/users/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'User.EventRoster PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventRoster, {partial: true}),
        },
      },
    })
    eventRoster: Partial<EventRoster>,
    @param.query.object('where', getWhereSchemaFor(EventRoster)) where?: Where<EventRoster>,
  ): Promise<Count> {
    return this.userRepository.eventRosters(id).patch(eventRoster, where);
  }

  @del('/users/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'User.EventRoster DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EventRoster)) where?: Where<EventRoster>,
  ): Promise<Count> {
    return this.userRepository.eventRosters(id).delete(where);
  }
}
