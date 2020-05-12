import {
  Count,
  CountSchema,
  Filter,
  model, 
  Entity, 
  repository,
  Where,
  property,
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

@model()
export class DetailedLeaderboard extends Entity {
  @property({
    type: 'string',
  })
  position: string;
  @property({
    type: 'number',
  })
  positionNum: number;
  @property({
    type: 'string',
  })
  player: string;
  @property({
    type: 'string',
  })
  startTime?: string;
  @property({
    type: 'string',
  })
  startHole?: string;
  @property({
    type: 'string',
  })
  playingHandicap: string;
  @property({
    type: 'string',
  })
  clubName: string;
  @property({
    type: 'number',
  })
  day1Stroke?: string;
  @property({
    type: 'string',
  })
  day2Stroke?: string;
  @property({
    type: 'string',
  })
  day3Stroke?: string;
  @property({
    type: 'string',
  })
  day4Stroke?: string;
  @property({
    type: 'string',
  })
  today?: string;
  @property({
    type: 'string',
  })
  total?: string;
  @property({
    type: 'string',
  })
  thru?: string;
  @property({
    type: 'string',
  })
  stroke?: string;
}


export class EventLeaderboardController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/detailedleaderboard', {
    responses: {
      '200': {
        description: 'Array of leaderboard scores',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetailedLeaderboard)},
          },
        },
      },
    },
  })
  async detailedleaderboard(
    @param.path.string('id') id: string,
  ): Promise<DetailedLeaderboard[]> {
    let leaderboard: any;
    let detailedLeaderboard:DetailedLeaderboard[] = [];
    let totalOld: number = -100;
    let positionOld: string = "";

    const filter = { include: [{relation: 'user'}]};

    leaderboard = await this.eventRepository.leaderboard(id).find(filter);

    leaderboard.sort((a:Leaderboard, b:Leaderboard) => {
      if (a.total && b.total) {
        if (a.total > b.total) {
          return 1;
        } else if (a.total < b.total) {
          return -1; 
        } else if (a.day4Stroke && b.day4Stroke) {
          if (a.day4Stroke > b.day4Stroke) {
            return 1;
          } else if (a.day4Stroke < b.day4Stroke) {
            return -1;
          } else if (a.day3Stroke && b.day3Stroke) {
            if (a.day3Stroke > b.day3Stroke) {
              return 1;
            } else if (a.day3Stroke < b.day3Stroke) {
              return -1;
            } else if (a.day2Stroke && b.day2Stroke) {
              if (a.day2Stroke > b.day2Stroke) {
                return 1;
              } else if (a.day2Stroke < b.day2Stroke) {
                return -1;
              } else if (a.day1Stroke && b.day1Stroke) {
                if (a.day1Stroke > b.day1Stroke) {
                  return 1;
                } else {
                  return -1;
                }
              } else if (a.day1Stroke) {
                return -1;
              } else { 
                return 1;
              } 
            } else if (a.day2Stroke) {
              return -1;
            } else { 
              return 1;
            } 
          } else if (a.day3Stroke) {
            return -1;
          } else { 
            return 1;
          } 
        } else if (a.day4Stroke) {
          return -1;
        } else { 
          return 1;
        } 
      } else if (a.total) {
        return -1;
      } else { 
        return 1;
      } 
    });

    for (let i = 0; i < leaderboard.length; i++) {
      let aLeaderboard: any = {};

      aLeaderboard.player = leaderboard[i].user.firstName + " " + leaderboard[i].user.lastName;
      aLeaderboard.startTime = leaderboard[i].startTime;
      aLeaderboard.startHole = "" + leaderboard[i].startHole;
      aLeaderboard.playingHandicap = "" + leaderboard[i].playingHandicap;
      aLeaderboard.clubName = leaderboard[i].user.clubName;
      if (leaderboard[i].day1Stroke) {
        aLeaderboard.day1Stroke = "" + leaderboard[i].day1Stroke;
      } else {
        aLeaderboard.day1Stroke = "";
      }
      if (leaderboard[i].day2Stroke) {
        aLeaderboard.day2Stroke = "" + leaderboard[i].day2Stroke;
      } else {
        aLeaderboard.day2Stroke = "";
      }
      if (leaderboard[i].day3Stroke) {
        aLeaderboard.day3Stroke = "" + leaderboard[i].day3Stroke;
      } else {
        aLeaderboard.day3Stroke = "";
      }
      if (leaderboard[i].day4Stroke) {
        aLeaderboard.day4Stroke = "" + leaderboard[i].day4Stroke;
      } else {
        aLeaderboard.day4Stroke = "";
      }

      if (leaderboard[i].stroke) {
        aLeaderboard.stroke = "" + leaderboard[i].stroke;
      } else {
        aLeaderboard.stroke = "";
      }

      if (leaderboard[i].thru) {
        if (leaderboard[i].thru === 18) {
          aLeaderboard.thru = "F";
        } else {
          aLeaderboard.thru = "" + leaderboard[i].thru;
        }
      } else {
        aLeaderboard.thru = "";
      }
      let total = leaderboard[i].total;
      if (total) {
        if (total > 0) {
          aLeaderboard.total = "+" + leaderboard[i].total;
        } else if (total < 0) {
          aLeaderboard.total = "" + leaderboard[i].total;
        } else {
          aLeaderboard.total = "E";
        }
      } else {
        aLeaderboard.total = "";
      }
      let today = leaderboard[i].today;
      if (today) {
        if (today > 0) {
          aLeaderboard.today = "+" + leaderboard[i].today;
        } else if (today < 0) {
          aLeaderboard.today = "" + leaderboard[i].today;
        } else {
          aLeaderboard.today = "E";
        }
      } else {
        aLeaderboard.today = "";
      }

      aLeaderboard.positionNum = i + 1;
      if (total === totalOld) {
        aLeaderboard.position = positionOld;
      } else {
        totalOld = total;
        if (i+1 < leaderboard.length && total === leaderboard[i+1].total) {
          aLeaderboard.position = "T" + (i + 1);
          positionOld = aLeaderboard.position;
        } else {
          aLeaderboard.position = "" + (i + 1);
        }
      }

      detailedLeaderboard.push(aLeaderboard);
    }

/*
*/
    return detailedLeaderboard;
  }






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
