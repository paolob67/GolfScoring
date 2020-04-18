import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {EventRoster} from '../models';
import {EventRosterRepository} from '../repositories';

export class EventRosterController {
  constructor(
    @repository(EventRosterRepository)
    public eventRosterRepository : EventRosterRepository,
  ) {}

  @post('/event-rosters', {
    responses: {
      '200': {
        description: 'EventRoster model instance',
        content: {'application/json': {schema: getModelSchemaRef(EventRoster)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventRoster, {
            title: 'NewEventRoster',
            exclude: ['EventRosterId'],
          }),
        },
      },
    })
    eventRoster: Omit<EventRoster, 'EventRosterId'>,
  ): Promise<EventRoster> {
    return this.eventRosterRepository.create(eventRoster);
  }

  @get('/event-rosters/count', {
    responses: {
      '200': {
        description: 'EventRoster model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(EventRoster) where?: Where<EventRoster>,
  ): Promise<Count> {
    return this.eventRosterRepository.count(where);
  }

  @get('/event-rosters', {
    responses: {
      '200': {
        description: 'Array of EventRoster model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EventRoster, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EventRoster) filter?: Filter<EventRoster>,
  ): Promise<EventRoster[]> {
    return this.eventRosterRepository.find(filter);
  }

  @patch('/event-rosters', {
    responses: {
      '200': {
        description: 'EventRoster PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventRoster, {partial: true}),
        },
      },
    })
    eventRoster: EventRoster,
    @param.where(EventRoster) where?: Where<EventRoster>,
  ): Promise<Count> {
    return this.eventRosterRepository.updateAll(eventRoster, where);
  }

  @get('/event-rosters/{id}', {
    responses: {
      '200': {
        description: 'EventRoster model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EventRoster, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EventRoster, {exclude: 'where'}) filter?: FilterExcludingWhere<EventRoster>
  ): Promise<EventRoster> {
    return this.eventRosterRepository.findById(id, filter);
  }

  @patch('/event-rosters/{id}', {
    responses: {
      '204': {
        description: 'EventRoster PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventRoster, {partial: true}),
        },
      },
    })
    eventRoster: EventRoster,
  ): Promise<void> {
    await this.eventRosterRepository.updateById(id, eventRoster);
  }

  @put('/event-rosters/{id}', {
    responses: {
      '204': {
        description: 'EventRoster PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() eventRoster: EventRoster,
  ): Promise<void> {
    await this.eventRosterRepository.replaceById(id, eventRoster);
  }

  @del('/event-rosters/{id}', {
    responses: {
      '204': {
        description: 'EventRoster DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.eventRosterRepository.deleteById(id);
  }
}
