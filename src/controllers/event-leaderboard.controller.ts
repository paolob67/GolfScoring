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
  Leaderboard,
} from '../models';
import {EventRepository} from '../repositories';

export class EventLeaderboardController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'Array of Event has many Leaderboard',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Leaderboard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Leaderboard>,
  ): Promise<Leaderboard[]> {
    return this.eventRepository.leaderboard(id).find(filter);
  }

  @post('/events/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(Leaderboard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {
            title: 'NewLeaderboardInEvent',
            exclude: ['id'],
            optional: ['eventId']
          }),
        },
      },
    }) leaderboard: Omit<Leaderboard, 'id'>,
  ): Promise<Leaderboard> {
    return this.eventRepository.leaderboard(id).create(leaderboard);
  }

  @patch('/events/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'Event.Leaderboard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leaderboard, {partial: true}),
        },
      },
    })
    leaderboard: Partial<Leaderboard>,
    @param.query.object('where', getWhereSchemaFor(Leaderboard)) where?: Where<Leaderboard>,
  ): Promise<Count> {
    return this.eventRepository.leaderboard(id).patch(leaderboard, where);
  }

  @del('/events/{id}/leaderboard', {
    responses: {
      '200': {
        description: 'Event.Leaderboard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Leaderboard)) where?: Where<Leaderboard>,
  ): Promise<Count> {
    return this.eventRepository.leaderboard(id).delete(where);
  }
}
