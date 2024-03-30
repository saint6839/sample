import {
  ValidationPipe,
  VersioningType,
  ValidationPipeOptions,
} from "@nestjs/common";

interface InitFactoryOptions {
  Logger: any;
  AppModule: any;
  AppConfig: Record<string, any>;
  ValidationsPipeOptions?: ValidationPipeOptions;
  security: (app: any, config: any) => void;
  multipart: (app: any, config: any) => void;
  bodyParser: (app: any, config: any) => void;
  compression: (app: any, config: any) => void;
  createMainApp: (app: any, config: any) => any;
  launchMainApp: (app: any, config: any) => void;
  documentationBuilder: (app: any, config: any) => void;
}

/**
 * This is a factory to create a NestJS application
 * it independent of the adapter used (Express, Fastify, etc)
 * @param {InitFactoryOptions} options - An object containing various options required for initializing
 * the NestJS application. These options include Logger, security, AppModule, AppConfig, multipart,
 * bodyParser, compression, createMainApp, launchMainApp, and documentationBuilder.
 */
export const initFactory = async (options: InitFactoryOptions) => {
  const {
    Logger,
    security,
    AppModule,
    AppConfig,
    multipart,
    bodyParser,
    compression,
    createMainApp,
    launchMainApp,
    documentationBuilder,
    ValidationsPipeOptions,
  } = options;

  // Constants
  if (!AppConfig["APP_BACKEND_PORT"]) {
    throw new Error("APP_BACKEND_PORT is not defined");
  }
  if (!AppConfig["API_PREFIX"]) {
    throw new Error("API_PREFIX is not defined");
  }

  const port = AppConfig["APP_BACKEND_PORT"] || 9000;
  const globalPrefix = AppConfig["API_PREFIX"] || "api";

  // Create NestJS application
  const app = await createMainApp(AppModule, AppConfig);

  // Important security things for NestJS
  await security(app, AppConfig);
  // import { ValidationPipe } from "@nestjs/common"
  // app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Adds compression utils to the application
  await compression(app, AppConfig);

  // Adds multipart form data support to the application
  await multipart(app, AppConfig);

  // Adds body parser data support to the application
  await bodyParser(app, AppConfig);

  // Setup API documentation

  /**
   * API Versioning [/api/v1/..., /api/v2/...]
   * import { Version } from '@nestjs/common';
   * @Version('1') or @Version(['1', '2'])
   */
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (ValidationsPipeOptions)
    app.useGlobalPipes(new ValidationPipe(ValidationsPipeOptions));

  app.enableShutdownHooks();

  await documentationBuilder(app, AppConfig);
  // Start application
  await launchMainApp(app, AppConfig);

  // Show application information
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
};
