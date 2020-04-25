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
  Score,
} from '../models';
import {EventRepository} from '../repositories';

export class EventScoreController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/scores', {
    responses: {
      '200': {
        description: 'Array of Event has many Score',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Score)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Score>,
  ): Promise<Score[]> {
    return this.eventRepository.scores(id).find(filter);
  }

  @post('/events/{id}/scores', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(Score)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {
            title: 'NewScoreInEvent',
            exclude: ['id'],
            optional: ['eventId']
          }),
        },
      },
    }) score: Omit<Score, 'id'>,
  ): Promise<Score> {
    return this.eventRepository.scores(id).create(score);
  }

  @patch('/events/{id}/scores', {
    responses: {
      '200': {
        description: 'Event.Score PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {partial: true}),
        },
      },
    })
    score: Partial<Score>,
    @param.query.object('where', getWhereSchemaFor(Score)) where?: Where<Score>,
  ): Promise<Count> {
    return this.eventRepository.scores(id).patch(score, where);
  }

  @del('/events/{id}/scores', {
    responses: {
      '200': {
        description: 'Event.Score DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Score)) where?: Where<Score>,
  ): Promise<Count> {
    return this.eventRepository.scores(id).delete(where);
  }
}
