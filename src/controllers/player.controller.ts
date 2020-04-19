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
import {Player} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository : PlayerRepository,
  ) {}

  @post('/players', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayer',
            
          }),
        },
      },
    })
    player: Player,
  ): Promise<Player> {
    return this.playerRepository.create(player);
  }

  @get('/players/count', {
    responses: {
      '200': {
        description: 'Player model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Player) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.count(where);
  }

  @get('/players', {
    responses: {
      '200': {
        description: 'Array of Player model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Player, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Player) filter?: Filter<Player>,
  ): Promise<Player[]> {
    return this.playerRepository.find(filter);
  }

  @patch('/players', {
    responses: {
      '200': {
        description: 'Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
    @param.where(Player) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.updateAll(player, where);
  }

  @get('/players/{id}', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Player, {exclude: 'where'}) filter?: FilterExcludingWhere<Player>
  ): Promise<Player> {
    return this.playerRepository.findById(id, filter);
  }

  @patch('/players/{id}', {
    responses: {
      '204': {
        description: 'Player PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
  ): Promise<void> {
    await this.playerRepository.updateById(id, player);
  }

  @put('/players/{id}', {
    responses: {
      '204': {
        description: 'Player PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() player: Player,
  ): Promise<void> {
    await this.playerRepository.replaceById(id, player);
  }

  @del('/players/{id}', {
    responses: {
      '204': {
        description: 'Player DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.playerRepository.deleteById(id);
  }
}
