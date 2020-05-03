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
import {Slope} from '../models';
import {SlopeRepository} from '../repositories';

export class SlopeController {
  constructor(
    @repository(SlopeRepository)
    public slopeRepository : SlopeRepository,
  ) {}

  @post('/slopes', {
    responses: {
      '200': {
        description: 'Slope model instance',
        content: {'application/json': {schema: getModelSchemaRef(Slope)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slope, {
            title: 'NewSlope',
            exclude: ['id'],
          }),
        },
      },
    })
    slope: Omit<Slope, 'id'>,
  ): Promise<Slope> {
    return this.slopeRepository.create(slope);
  }

  @get('/slopes/count', {
    responses: {
      '200': {
        description: 'Slope model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Slope) where?: Where<Slope>,
  ): Promise<Count> {
    return this.slopeRepository.count(where);
  }

  @get('/slopes', {
    responses: {
      '200': {
        description: 'Array of Slope model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Slope, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Slope) filter?: Filter<Slope>,
  ): Promise<Slope[]> {
    return this.slopeRepository.find(filter);
  }

  @patch('/slopes', {
    responses: {
      '200': {
        description: 'Slope PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slope, {partial: true}),
        },
      },
    })
    slope: Slope,
    @param.where(Slope) where?: Where<Slope>,
  ): Promise<Count> {
    return this.slopeRepository.updateAll(slope, where);
  }

  @get('/slopes/{id}', {
    responses: {
      '200': {
        description: 'Slope model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Slope, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Slope, {exclude: 'where'}) filter?: FilterExcludingWhere<Slope>
  ): Promise<Slope> {
    return this.slopeRepository.findById(id, filter);
  }

  @patch('/slopes/{id}', {
    responses: {
      '204': {
        description: 'Slope PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slope, {partial: true}),
        },
      },
    })
    slope: Slope,
  ): Promise<void> {
    await this.slopeRepository.updateById(id, slope);
  }

  @put('/slopes/{id}', {
    responses: {
      '204': {
        description: 'Slope PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() slope: Slope,
  ): Promise<void> {
    await this.slopeRepository.replaceById(id, slope);
  }

  @del('/slopes/{id}', {
    responses: {
      '204': {
        description: 'Slope DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.slopeRepository.deleteById(id);
  }
}
