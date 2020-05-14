import {
  Count,
  CountSchema,
  Entity, 
  Filter,
  repository,
  Where,
  model, 
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
  HoleScore,
  User,
  Course,
  Score,
} from '../models';
import {
  EventRepository,
  ScoreRepository,
  CourseRepository
} from '../repositories';

@model()
export class DetailedScore extends Entity {
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
  startTime: string;
  @property({
    type: 'string',
  })
  startHole: string;
  @property({
    type: 'string',
  })
  playingHandicap: string;
  @property({
    type: 'string',
  })
  hole1: string;
  @property({
    type: 'string',
  })
  result1: string;
  @property({
    type: 'string',
  })
  hole2: string;
  @property({
    type: 'string',
  })
  result2: string;
  @property({
    type: 'string',
  })
  hole3: string;
  @property({
    type: 'string',
  })
  result3: string;
  @property({
    type: 'string',
  })
  hole4: string;
  @property({
    type: 'string',
  })
  result4: string;
  @property({
    type: 'string',
  })
  hole5: string;
  @property({
    type: 'string',
  })
  result5: string;
  @property({
    type: 'string',
  })
  hole6: string;
  @property({
    type: 'string',
  })
  result6: string;
  @property({
    type: 'string',
  })
  hole7: string;
  @property({
    type: 'string',
  })
  result7: string;
  @property({
    type: 'string',
  })
  hole8: string;
  @property({
    type: 'string',
  })
  result8: string;
  @property({
    type: 'string',
  })
  hole9: string;
  @property({
    type: 'string',
  })
  result9: string;
  @property({
    type: 'string',
  })
  hole10: string;
  @property({
    type: 'string',
  })
  result10: string;
  @property({
    type: 'string',
  })
  hole11: string;
  @property({
    type: 'string',
  })
  result11: string;
  @property({
    type: 'string',
  })
  hole12: string;
  @property({
    type: 'string',
  })
  result12: string;
  @property({
    type: 'string',
  })
  hole13: string;
  @property({
    type: 'string',
  })
  result13: string;
  @property({
    type: 'string',
  })
  hole14: string;
  @property({
    type: 'string',
  })
  result14: string;
  @property({
    type: 'string',
  })
  hole15: string;
  @property({
    type: 'string',
  })
  result15: string;
  @property({
    type: 'string',
  })
  hole16: string;
  @property({
    type: 'string',
  })
  result16: string;
  @property({
    type: 'string',
  })
  hole17: string;
  @property({
    type: 'string',
  })
  result17: string;
  @property({
    type: 'string',
  })
  hole18: string;
  @property({
    type: 'string',
  })
  result18: string;
  @property({
    type: 'string',
  })
  outHoles: string;
  @property({
    type: 'string',
  })
  inHoles: string;
  @property({
    type: 'string',
  })
  stroke: string;
  @property({
    type: 'string',
  })
  thru: string;
  @property({
    type: 'string',
  })
  total: string;
  @property({
    type: 'string',
  })
  net: string;
  @property({
    type: 'string',
  })
  stableford: string;
}

@model()
export class RoundScores extends Entity {
  @property({
    type: Event,
  })
  event: Event;
  @property({
    type: Course,
  })
  course: Course;
  @property({
    type: Array,
  })
  detailedScores: DetailedScore[] = [];
}



export class EventScoreController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
    @repository(CourseRepository) protected courseRepository: CourseRepository,
    @repository(ScoreRepository) protected scoreRepository: ScoreRepository,
  ) { }


  @get('/events/{id}/roundscores/{roundId}', {
    responses: {
      '200': {
        description: 'Array of round scores has many DetailedScore',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetailedScore)},
          },
        },
      },
    },
  })
  async roundscores(
    @param.path.string('id') id: string,
    @param.path.string('roundId') roundId: number,
  ): Promise<RoundScores> {

    const filter = { where: {and: [{eventId: id}, {round: roundId}]}, include: [{relation: 'holeScores'}, {relation: 'user'}]};
    return this.collectScores(id, filter);
  }

  @get('/events/{id}/playerscores/{userId}', {
    responses: {
      '200': {
        description: 'Array of round scores has many DetailedScore',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetailedScore)},
          },
        },
      },
    },
  })
  async playerscores(
    @param.path.string('id') id: string,
    @param.path.string('userId') userId: string,
  ): Promise<RoundScores> {

    const filter = { where: {and: [{eventId: id}, {userId: userId}]}, include: [{relation: 'holeScores'}, {relation: 'user'}]};
    return this.collectScores(id, filter);
  }




  async collectScores(id: string, scoreFilter?: Filter<Score>): Promise<RoundScores> {
    let scores: any;
    let hole: HoleScore;
    let holePar: number;
    let par: number[] = [];
    let roundScores: RoundScores = new RoundScores();
    let totalOld: number = -100;
    let positionOld: string = "";

    roundScores.event = await this.eventRepository.findById(id);
    const filter = {include: [ {relation: 'holes', scope: {order: ['number', 'ASC']}}]};

    roundScores.course = await this.courseRepository.findById(roundScores.event.courseId, filter);

    for (let i = 0; i < roundScores.course.holes.length; i++) {
      const holePar = roundScores.course.holes[i].par;
      if (holePar) {
        par.push(holePar);
      }
    } 

    scores = await this.scoreRepository.find(scoreFilter);



    scores.sort((a:Score, b:Score) => {
      if (a.total && b.total) {
        if (a.total > b.total) {
          return 1;
        } else if (a.total < b.total) {
          return -1; 
        } else if (a.inHoles && b.inHoles && a.inHoles > b.inHoles) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.total) {
        return -1;
      } else { 
        return 1;
      } 
    });


    for (let i = 0; i < scores.length; i++) {
      let detailedScore: DetailedScore = new DetailedScore();
      detailedScore.startTime = scores[i].startTime;
      detailedScore.startHole = "" + scores[i].startHole;
      detailedScore.playingHandicap = "" + scores[i].playingHandicap;

      detailedScore.player = scores[i].user.firstName + " " + scores[i].user.lastName;

      if (scores[i].outHoles) {
        detailedScore.outHoles = "" + scores[i].outHoles;
      } else {
        detailedScore.outHoles = "";
      }
      if (scores[i].inHoles) {
        detailedScore.inHoles = "" + scores[i].inHoles;
      } else {
        detailedScore.inHoles = "";
      }
      if (scores[i].stroke) {
        detailedScore.stroke = "" + scores[i].stroke;
      } else {
        detailedScore.stroke = "";
      }
      if (scores[i].stableford) {
        detailedScore.stableford = "" + scores[i].stableford;
      } else {
        detailedScore.stableford = "";
      }

      if (scores[i].thru) {
        if (scores[i].thru === 18) {
          detailedScore.thru = "F";
        } else {
          detailedScore.thru = "" + scores[i].thru;
        }
      } else {
        detailedScore.thru = "";
      }
      let total = scores[i].total;
      if (total) {
        if (total > 0) {
          detailedScore.total = "+" + scores[i].total;
        } else if (total < 0) {
          detailedScore.total = "" + scores[i].total;
        } else {
          detailedScore.total = "E";
        }
      } else {
        detailedScore.total = "";
      }
      let net = scores[i].net;
      if (net) {
        if (net > 0) {
          detailedScore.net = "+" + scores[i].net;
        } else {
          detailedScore.net = "" + scores[i].net;
        }
      } else {
        detailedScore.net = "";
      }

      detailedScore.positionNum = i + 1;
      if (total === totalOld) {
        detailedScore.position = positionOld;
      } else {
        totalOld = total;
        if (i+1 < scores.length && total === scores[i+1].total) {
          detailedScore.position = "T" + (i + 1);
          positionOld = detailedScore.position;
        } else {
          detailedScore.position = "" + (i + 1);
        }
      }



      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 1 );
      if (hole.marker) {
        detailedScore.hole1 = "" + hole.marker;
        holePar = par[0];

        if (hole.marker-holePar > 1) {
          detailedScore.result1 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result1 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result1 = "par";
              break;
          case 1:
              detailedScore.result1 = "bogey";
              break;
          case -1:
              detailedScore.result1 = "birdie";
              break;
        }
      } else {
        detailedScore.hole1 = "";
        detailedScore.result1 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 2 );
      if (hole.marker) {
        detailedScore.hole2 = "" + hole.marker;
        holePar = par[1];

        if (hole.marker-holePar > 1) {
          detailedScore.result2 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result2 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result2 = "par";
              break;
          case 1:
              detailedScore.result2 = "bogey";
              break;
          case -1:
              detailedScore.result2 = "birdie";
              break;
        }
      } else {
        detailedScore.hole2 = "";
        detailedScore.result2 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 3 );
      if (hole.marker) {
        detailedScore.hole3 = "" + hole.marker;
        holePar = par[2];

        if (hole.marker-holePar > 1) {
          detailedScore.result3 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result3 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result3 = "par";
              break;
          case 1:
              detailedScore.result3 = "bogey";
              break;
          case -1:
              detailedScore.result3 = "birdie";
              break;
        }
      } else {
        detailedScore.hole3 = "";
        detailedScore.result3 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 4 );
      if (hole.marker) {
        detailedScore.hole4 = "" + hole.marker;
        holePar = par[3];

        if (hole.marker-holePar > 1) {
          detailedScore.result4 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result4 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result4 = "par";
              break;
          case 1:
              detailedScore.result4 = "bogey";
              break;
          case -1:
              detailedScore.result4 = "birdie";
              break;
        }
      } else {
        detailedScore.hole4 = "";
        detailedScore.result4 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 5 );
      if (hole.marker) {
        detailedScore.hole5 = "" + hole.marker;
        holePar = par[4];

        if (hole.marker-holePar > 1) {
          detailedScore.result5 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result5 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result5 = "par";
              break;
          case 1:
              detailedScore.result5 = "bogey";
              break;
          case -1:
              detailedScore.result5 = "birdie";
              break;
        }
      } else {
        detailedScore.hole5 = "";
        detailedScore.result5 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 6 );
      if (hole.marker) {
        detailedScore.hole6 = "" + hole.marker;
        holePar = par[5];

        if (hole.marker-holePar > 1) {
          detailedScore.result6 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result6 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result6 = "par";
              break;
          case 1:
              detailedScore.result6 = "bogey";
              break;
          case -1:
              detailedScore.result6 = "birdie";
              break;
        }
      } else {
        detailedScore.hole6 = "";
        detailedScore.result6 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 7 );
      if (hole.marker) {
        detailedScore.hole7 = "" + hole.marker;
        holePar = par[6];

        if (hole.marker-holePar > 1) {
          detailedScore.result7 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result7 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result7 = "par";
              break;
          case 1:
              detailedScore.result7 = "bogey";
              break;
          case -1:
              detailedScore.result7 = "birdie";
              break;
        }
      } else {
        detailedScore.hole7 = "";
        detailedScore.result7 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 8 );
      if (hole.marker) {
        detailedScore.hole8 = "" + hole.marker;
        holePar = par[7];

        if (hole.marker-holePar > 1) {
          detailedScore.result8 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result8 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result8 = "par";
              break;
          case 1:
              detailedScore.result8 = "bogey";
              break;
          case -1:
              detailedScore.result8 = "birdie";
              break;
        }
      } else {
        detailedScore.hole8 = "";
        detailedScore.result8 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 9 );
      if (hole.marker) {
        detailedScore.hole9 = "" + hole.marker;
        holePar = par[8];

        if (hole.marker-holePar > 1) {
          detailedScore.result9 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result9 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result9 = "par";
              break;
          case 1:
              detailedScore.result9 = "bogey";
              break;
          case -1:
              detailedScore.result9 = "birdie";
              break;
        }
      } else {
        detailedScore.hole9 = "";
        detailedScore.result9 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 10 );
      if (hole.marker) {
        detailedScore.hole10 = "" + hole.marker;
        holePar = par[9];

        if (hole.marker-holePar > 1) {
          detailedScore.result10 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result10 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result10 = "par";
              break;
          case 1:
              detailedScore.result10 = "bogey";
              break;
          case -1:
              detailedScore.result10 = "birdie";
              break;
        }
      } else {
        detailedScore.hole10 = "";
        detailedScore.result10 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 11 );
      if (hole.marker) {
        detailedScore.hole11 = "" + hole.marker;
        holePar = par[10];

        if (hole.marker-holePar > 1) {
          detailedScore.result11 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result11 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result11 = "par";
              break;
          case 1:
              detailedScore.result11 = "bogey";
              break;
          case -1:
              detailedScore.result11 = "birdie";
              break;
        }
      } else {
        detailedScore.hole11 = "";
        detailedScore.result11 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 12 );
      if (hole.marker) {
        detailedScore.hole12 = "" + hole.marker;
        holePar = par[11];

        if (hole.marker-holePar > 1) {
          detailedScore.result12 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result12 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result12 = "par";
              break;
          case 1:
              detailedScore.result12 = "bogey";
              break;
          case -1:
              detailedScore.result12 = "birdie";
              break;
        }
      } else {
        detailedScore.hole12 = "";
        detailedScore.result12 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 13 );
      if (hole.marker) {
        detailedScore.hole13 = "" + hole.marker;
        holePar = par[12];

        if (hole.marker-holePar > 1) {
          detailedScore.result13 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result13 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result13 = "par";
              break;
          case 1:
              detailedScore.result13 = "bogey";
              break;
          case -1:
              detailedScore.result13 = "birdie";
              break;
        }
      } else {
        detailedScore.hole13 = "";
        detailedScore.result13 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 14 );
      if (hole.marker) {
        detailedScore.hole14 = "" + hole.marker;
        holePar = par[13];

        if (hole.marker-holePar > 1) {
          detailedScore.result14 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result14 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result14 = "par";
              break;
          case 1:
              detailedScore.result14 = "bogey";
              break;
          case -1:
              detailedScore.result14 = "birdie";
              break;
        }
      } else {
        detailedScore.hole14 = "";
        detailedScore.result14 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 15 );
      if (hole.marker) {
        detailedScore.hole15 = "" + hole.marker;
        holePar = par[14];

        if (hole.marker-holePar > 1) {
          detailedScore.result15 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result15 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result15 = "par";
              break;
          case 1:
              detailedScore.result15 = "bogey";
              break;
          case -1:
              detailedScore.result15 = "birdie";
              break;
        }
      } else {
        detailedScore.hole15 = "";
        detailedScore.result15 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 16 );
      if (hole.marker) {
        detailedScore.hole16 = "" + hole.marker;
        holePar = par[15];

        if (hole.marker-holePar > 1) {
          detailedScore.result16 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result16 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result16 = "par";
              break;
          case 1:
              detailedScore.result16 = "bogey";
              break;
          case -1:
              detailedScore.result16 = "birdie";
              break;
        }
      } else {
        detailedScore.hole16 = "";
        detailedScore.result16 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 17 );
      if (hole.marker) {
        detailedScore.hole17 = "" + hole.marker;
        holePar = par[16];

        if (hole.marker-holePar > 1) {
          detailedScore.result17 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result17 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result17 = "par";
              break;
          case 1:
              detailedScore.result17 = "bogey";
              break;
          case -1:
              detailedScore.result17 = "birdie";
              break;
        }
      } else {
        detailedScore.hole17 = "";
        detailedScore.result17 = "";
      }

      hole = scores[i].holeScores.find( (x:HoleScore) => x.holeNumber === 18 );
      if (hole.marker) {
        detailedScore.hole18 = "" + hole.marker;
        holePar = par[17];

        if (hole.marker-holePar > 1) {
          detailedScore.result18 = "double";
        } else if (hole.marker-holePar < -1) {
          detailedScore.result18 = "eagle";
        }
        switch (hole.marker-holePar) {
          case 0:
              detailedScore.result18 = "par";
              break;
          case 1:
              detailedScore.result18 = "bogey";
              break;
          case -1:
              detailedScore.result18 = "birdie";
              break;
        }
      } else {
        detailedScore.hole18 = "";
        detailedScore.result18 = "";
      }

      roundScores.detailedScores.push(detailedScore);
    }

    return roundScores;
  }


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
