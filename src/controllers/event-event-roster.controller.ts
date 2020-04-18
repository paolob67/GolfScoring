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
  EventRoster,
} from '../models';
import {EventRepository} from '../repositories';

export class EventEventRosterController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'Array of Event has many EventRoster',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EventRoster)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EventRoster>,
  ): Promise<EventRoster[]> {
    return this.eventRepository.eventRosters(id).find(filter);
  }

  @post('/events/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventRoster)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Event.prototype.EventId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventRoster, {
            title: 'NewEventRosterInEvent',
            exclude: ['EventRosterId'],
            optional: ['eventId']
          }),
        },
      },
    }) eventRoster: Omit<EventRoster, 'EventRosterId'>,
  ): Promise<EventRoster> {
    return this.eventRepository.eventRosters(id).create(eventRoster);
  }

  @patch('/events/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'Event.EventRoster PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.eventRepository.eventRosters(id).patch(eventRoster, where);
  }

  @del('/events/{id}/event-rosters', {
    responses: {
      '200': {
        description: 'Event.EventRoster DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EventRoster)) where?: Where<EventRoster>,
  ): Promise<Count> {
    return this.eventRepository.eventRosters(id).delete(where);
  }
}
