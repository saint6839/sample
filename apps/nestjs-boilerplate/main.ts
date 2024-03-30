// Node Modules
import { Logger } from '@nestjs/common';
// Main App Module
import { AppModule } from 'modules/app/app.module';
// Libs
import { initFactory } from '@libs/nest-init-app-factory';
import { getConfigModel } from '@libs/node-config-env-storage';
import { fastifyAdapter } from '@libs/nest-init-app-fastify-adapter';
import { documentationSwaggerAdapter } from '@libs/nest-use-documentation-swagger-adapter';

/**************************************************
 * Main app config env variables
 * (Must be assigned at the top of the file)
 **************************************************/

const AppConfig: Record<string, any> = getConfigModel('app');

/**************************************************
 * Extract fastify adapter methods to use in initFactory
 **************************************************/
const { security, multipart, bodyParser, compression, createMainApp, launchMainApp } = fastifyAdapter();

/**************************************************
 * Init Application Factory
 **************************************************/
initFactory({
  Logger,
  AppModule,
  security,
  AppConfig,
  ValidationsPipeOptions: {
    transform: true,
    whitelist: true,
  },
  multipart,
  bodyParser,
  compression,
  createMainApp,
  launchMainApp,
  documentationBuilder: documentationSwaggerAdapter,
});
