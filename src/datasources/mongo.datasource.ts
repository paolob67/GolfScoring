// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject, lifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler, AnyObject} from '@loopback/repository';
import config from './mongo.datasource.config.json';


@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource {
  static dataSourceName = 'mongo';

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
  
  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
