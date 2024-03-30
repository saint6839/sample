import * as path from 'path';
import fcors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fstatic from '@fastify/static';
import compress from '@fastify/compress';
import { NestFactory } from '@nestjs/core';
import fmultipart from '@fastify/multipart';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// import fastifyCsrf from '@fastify/csrf-protection';

/*
 * AppConfig keys example:
 * - STATIC_ASSETS_FOLDER_NAME
 * - CORS_WHITELIST
 * - CORS_BLACKLIST
 * - MAX_UPLOAD_FILE_SIZE
 * - BODY_SIZE_LIMIT
 * - APP_PORT
 */

/**
 * This adapter is created to replace default "express" req-res handler and separated to lib to be universal and reusable
 *
 * @return {Object} An object containing functions for setting up security, multipart, body parsing, compression, and launching the main app
 */
export const fastifyAdapter = () => {
  const createMainApp = async (AppModule: any, AppConfig?: any) => {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    const staticAssetsFolderName = AppConfig?.STATIC_ASSETS_FOLDER_NAME || 'public';

    await app.register(fstatic, {
      root: path.join(__dirname, staticAssetsFolderName),
      prefix: '/' + staticAssetsFolderName + '/',
      constraints: {}, // optional: { host: 'example.com' }
    });

    return app;
  };

  const security = async (app: NestFastifyApplication, AppConfig?: any) => {
    // npm i --save @nestjs/throttler
    const blacklist = AppConfig.CORS_BLACKLIST || []; // ['https://example.com']
    const whitelist = AppConfig.CORS_WHITELIST || []; // ['https://example.com']

    await app.register(fcors, {
      origin: function (origin, callback) {
        if (blacklist.length > 0) {
          if (blacklist.includes('*')) {
            if (whitelist.indexOf(origin) !== -1) {
              callback(null, true); // allowed cors
            } else {
              callback(new Error('Not allowed by CORS'), false);
            }
          } else {
            if (blacklist.indexOf(origin) !== -1) {
              callback(new Error('Not allowed by CORS'), false);
            } else {
              callback(null, true); // allowed cors
            }
          }
        } else {
          callback(null, true); // allowed cors
        }
      },
      // Uncomment this if you want to allow cookies or authorization headers
      // methods: ['GET,HEAD,OPTIONS,POST,PUT'],
      // allowedHeaders: [
      //   'Content-Type',
      //   'X-CSRF-TOKEN',
      //   'access-control-allow-methods',
      //   'Access-Control-Allow-Origin',
      //   'access-control-allow-credentials',
      //   'access-control-allow-headers',
      //   'X-Requested-With', 'X-HTTP-Method-Override', 'Accept', 'Observe'
      // ],
      // credentials: true,
    });

    await app.register(helmet, {
      // contentSecurityPolicy: false, // for GraphQL
    });

    // await app.register(fastifyCsrf); // Setup later
  };

  const multipart = async (app: NestFastifyApplication, AppConfig?: any) => {
    const maxUploadFileSize = AppConfig?.MAX_UPLOAD_FILE_SIZE || 1000000;
    app.register(fmultipart, {
      limits: {
        fieldNameSize: 100, // Max field name size in bytes
        fieldSize: 100, // Max field value size in bytes
        fields: 10, // Max number of non-file fields
        fileSize: maxUploadFileSize, // For multipart forms, the max file size in bytes
        files: 1, // Max number of file fields
        headerPairs: 2000, // Max number of header key=>value pairs
      },
    });
  };

  const bodyParser = async (app: NestFastifyApplication, AppConfig?: any) => {
    const bodyLimit = AppConfig.BODY_SIZE_LIMIT || '10mb';

    app.useBodyParser('application/jsoff', { bodyLimit });
    app.useBodyParser('application/octet-stream', { bodyLimit });
  };

  // AppConfig?: any
  const compression = async (app: NestFastifyApplication) => {
    await app.register(compress, { encodings: ['gzip', 'deflate'] });
  };

  const launchMainApp = async (app: NestFastifyApplication, AppConfig?: any) => {
    await app.listen(AppConfig['APP_PORT'] || 9000);
  };

  // Define the custom parser function
  // const customParser: FastifyBodyParser<any> = (_, body, done) => {
  //   try {
  //     const parsedBody = JSON.parse(body);
  //     done(null, parsedBody);
  //   } catch (error: any) {
  //     done(error, undefined);
  //   }
  // };

  return {
    security,
    multipart,
    bodyParser,
    compression,
    launchMainApp,
    createMainApp,
  };
};
