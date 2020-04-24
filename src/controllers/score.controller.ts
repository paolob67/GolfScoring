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
import {Score} from '../models';
import {ScoreRepository} from '../repositories';

export class ScoreController {
  constructor(
    @repository(ScoreRepository)
    public scoreRepository : ScoreRepository,
  ) {}

  @post('/scores', {
    responses: {
      '200': {
        description: 'Score model instance',
        content: {'application/json': {schema: getModelSchemaRef(Score)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {
            title: 'NewScore',
            exclude: ['id'],
          }),
        },
      },
    })
    score: Omit<Score, 'id'>,
  ): Promise<Score> {
    return this.scoreRepository.create(score);
  }

  @get('/scores/count', {
    responses: {
      '200': {
        description: 'Score model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Score) where?: Where<Score>,
  ): Promise<Count> {
    return this.scoreRepository.count(where);
  }

  @get('/scores', {
    responses: {
      '200': {
        description: 'Array of Score model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Score, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Score) filter?: Filter<Score>,
  ): Promise<Score[]> {
    return this.scoreRepository.find(filter);
  }

  @patch('/scores', {
    responses: {
      '200': {
        description: 'Score PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {partial: true}),
        },
      },
    })
    score: Score,
    @param.where(Score) where?: Where<Score>,
  ): Promise<Count> {
    return this.scoreRepository.updateAll(score, where);
  }

  @get('/scores/{id}', {
    responses: {
      '200': {
        description: 'Score model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Score, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: string,
    @param.filter(Score, {exclude: 'where'}) filter?: FilterExcludingWhere<Score>
  ): Promise<Score> {
    return this.scoreRepository.findById(id, filter);
  }

  @patch('/scores/{id}', {
    responses: {
      '204': {
        description: 'Score PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Score, {partial: true}),
        },
      },
    })
    score: Score,
  ): Promise<void> {
    await this.scoreRepository.updateById(id, score);
  }

  @put('/scores/{id}', {
    responses: {
      '204': {
        description: 'Score PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() score: Score,
  ): Promise<void> {
    await this.scoreRepository.replaceById(id, score);
  }

  @del('/scores/{id}', {
    responses: {
      '204': {
        description: 'Score DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.scoreRepository.deleteById(id);
  }
}
