import { setConfigModel } from '@libs/node-config-env-storage';

/**
 * Set the configuration model for the 'app' module
 * How to use anywhere in the application:
 * @example
 * import { getConfigModel } from '@libs/node-config-env-storage';
 * const AppConfig: IAppConfig = getConfigModel('app');
 * const { APP_NAME } = AppConfig;
 */
setConfigModel('app', {
  // Configuration for the Node.js environment
  NODE_ENV: {
    type: 'string',
    default: 'development',
    description: 'Node.js environment',
  },
  // Configuration for the name of the application
  APP_NAME: {
    type: 'string',
    default: 'development',
    description: 'Name of the application',
  },
  // Configuration for the working directory of the application
  PWD: {
    type: 'string',
    default: process.cwd(),
    description: 'Working directory of the application',
  },
  // Configuration for the frontend domain of the application
  FRONTEND_DOMAIN: {
    type: 'string',
    default: 'http://localhost:3000',
    description: 'Frontend domain of the application',
  },
  // Configuration for the backend domain of the application
  BACKEND_DOMAIN: {
    type: 'string',
    default: 'http://localhost:9000',
    description: 'Backend domain of the application',
  },
  // Configuration for the port of the application
  APP_BACKEND_PORT: {
    type: 'number',
    default: 9000,
    description: 'Port of the application',
  },
  // Configuration for the API prefix of the application
  API_PREFIX: {
    type: 'string',
    default: 'api',
    description: 'API prefix of the application',
  },
  // Configuration for the fallback language of the application
  APP_FALLBACK_LANGUAGE: {
    type: 'string',
    default: 'en',
    description: 'Fallback language of the application',
  },
  // Configuration for the header language of the application
  APP_HEADER_LANGUAGE: {
    type: 'string',
    default: 'x-custom-lang',
    description: 'Header language of the application',
  },
  // Configuration for the API docs title
  APP_DOCS_TITLE: {
    type: 'string',
    default: 'API',
    description: 'API docs title',
  },
  // Configuration for the API docs version
  APP_DOCS_VERSION: {
    type: 'string',
    default: '1.0',
    description: 'API docs version',
  },
  // Configuration for the API docs description
  APP_DOCS_DESCRIPTION: {
    type: 'string',
    default: 'API docs description',
    description: 'API docs description',
  },
  // Configuration for additional documentation properties (commented out in the original code)
  // docsTitle: 'API',
  // docsDescription: 'API docs',
  // docsVersion: '1.0',
});
