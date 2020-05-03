// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {AuthenticationComponent} from '@loopback/authentication';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {
  ApplicationConfig,
  BindingKey,
  createBindingFromClass,
} from '@loopback/core';
import {
  model,
  property,
  Filter,
  RepositoryMixin,
  SchemaMigrationOptions,
} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import {JWTAuthenticationStrategy} from './authentication-strategies/jwt-strategy';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings,
} from './keys';
import {User} from './models';
import {
//  OrderRepository,
//  ProductRepository,
//  ShoppingCartRepository,
  CourseRepository,
  AddressRepository,
  HoleRepository,
  UserRepository,
  EventRepository,
  ScoreRepository,
  HoleScoreRepository,
} from './repositories';
import {MyAuthenticationSequence} from './sequence';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {JWTService} from './services/jwt-service';
import {MyUserService} from './services/user-service';
import YAML = require('yaml');

/**
 * Information from package.json
 */
export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

@model()
export class NewUser extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class GolfScoringApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    this.setUpBindings();

    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);

    // authentication
    this.add(createBindingFromClass(JWTAuthenticationStrategy));

    // Set up the custom sequence
    this.sequence(MyAuthenticationSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    //this.static('/', path.join(__dirname, '../www'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }

  async start() {
    // Use `databaseSeeding` flag to control if products/users should be pre
    // populated into the database. Its value is default to `true`.
    if (this.options.databaseSeeding !== false) {
      console.log('\n> loading bootstrap data...');
      await this.migrateSchema();
      console.log('> done');
    }
    return super.start();
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    await super.migrateSchema(options);

    // Pre-populate courses
    const courseRepo = await this.getRepository(CourseRepository);
    const addressRepo = await this.getRepository(AddressRepository);
    const holeRepo = await this.getRepository(HoleRepository);
    await courseRepo.deleteAll();
    await addressRepo.deleteAll();
    await holeRepo.deleteAll();
    const coursesDir = path.join(__dirname, '../fixtures/courses');
    const courseFiles = fs.readdirSync(coursesDir);

    for (const file of courseFiles) {
       if (file.endsWith('.yml')) {
         const courseFile = path.join(coursesDir, file);
         console.log('  - ' + courseFile);
         const yamlString = fs.readFileSync(courseFile, 'utf8');
         const input = YAML.parse(yamlString);
         const newCourse = await courseRepo.create(input.courseTable);
         input.addressTable.courseId = newCourse.id;
         await addressRepo.create(input.addressTable);
         for (const hole of input.holeTables) {
           hole.courseId = newCourse.id;
           await holeRepo.create(hole);
         }
       }
    }

    // Pre-populate users
    const passwordHasher = await this.get(
      PasswordHasherBindings.PASSWORD_HASHER,
    );
    const userRepo = await this.getRepository(UserRepository);
    await userRepo.deleteAll();
    const usersDir = path.join(__dirname, '../fixtures/users');
    const userFiles = fs.readdirSync(usersDir);

    for (const file of userFiles) {
      if (file.endsWith('.yml')) {
        const userFile = path.join(usersDir, file);
        console.log('  - ' + userFile);
        const yamlString = YAML.parse(fs.readFileSync(userFile, 'utf8'));
        const input = new NewUser(yamlString);
        const password = await passwordHasher.hashPassword(input.password);
        input.password = password;
        const user = await userRepo.create(_.omit(input, 'password'));

        await userRepo.userCredentials(user.id).create({password});
      }
    }

    // Prepopulate one Event and create score holeTables
    const eventRepo = await this.getRepository(EventRepository);
    const scoreRepo = await this.getRepository(ScoreRepository);
    const holescoreRepo = await this.getRepository(HoleScoreRepository);
    await eventRepo.deleteAll();
    await scoreRepo.deleteAll();
    await holescoreRepo.deleteAll();
    const eventsDir = path.join(__dirname, '../fixtures/events');
    const eventFiles = fs.readdirSync(eventsDir);

    for (const file of eventFiles) {
      if (file.endsWith('.yml')) {
        const eventFile = path.join(eventsDir, file);
        console.log('  - ' + eventFile);
        const yamlString = fs.readFileSync(eventFile, 'utf8');
        const input = YAML.parse(yamlString);
        const filterStr = '{"where":{"name":"'+input.courseRef.name+'"}}';
        const filter = JSON.parse(filterStr) as Filter;
        const foundCourses = await courseRepo.find(filter);
        input.eventTable.courseId = foundCourses[0].id;
        const newEvent = await eventRepo.create(input.eventTable);
        for (const player of input.playersRef) {
          const filterStr = '{"where":{"email":"'+player.email+'"}}';
          const filter = JSON.parse(filterStr) as Filter;
          const foundPlayers = await userRepo.find(filter);
          player.userId = foundPlayers[0].id;
          for (let round = 1; round <= input.eventTable.numberOfRounds; round++) {
            const newScore = {
              startTime: player.startTime,
              playingHandicap: 0, //TODO: is this a prop of the course or of the event?
              startHole: player.startHole,
              round: round,
              eventId: newEvent.id,
              userId: player.userId,
            };
            const newScoreRec = await scoreRepo.create(newScore);
            for (const holeScore of player.holeScores) {
              const newHoleScore = {
                holeNumber: holeScore.holeNumber,
                self: holeScore.self,
                marker: holeScore.marker,
                markerId: holeScore.markerId,
                validated: holeScore.validated,
                scoreId: newScoreRec.id,
              };
              await holescoreRepo.create(newHoleScore);
            }
          }
        }
      }
    }

  }
}
