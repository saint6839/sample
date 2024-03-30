import path from "path";
import dotenv from "dotenv";
import { validateSchema } from "./envalid-adapter";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const envStore = new Map<string, Record<string, any>>();

/**
 * This function sets a configuration model in an environment store.
 * @param {string} name - A string representing the name of the configuration model being set.
 * @param model - The `model` parameter is a JavaScript object that contains key-value pairs where the
 * keys are strings and the values can be strings, numbers, or booleans. This object represents a
 * configuration model that can be stored in the `envStore`. The `setConfigModel` function takes this
 * model and associates
 *
 * ```ts
 * import { setConfigModel } from '@nestjs-boilerplate/node-config-env-storage';
 *
 * setConfigModel('app', {
 *     nodeEnv: { key: 'NODE_ENV', type: 'string', default: 'development', description: 'Node.js environment' },
 *     name: { key: 'APP_NAME' type: 'string', default: 'nestjs-boilerplate', description: 'Name of the application' },
 * });
 *
 * where type must be one of the following:
 * `string` - Parses an string env var: "example"
 * `bool` - Parses env var strings "1", "0", "true", "false", "t", "f" into booleans
 * `number` - Parses an env var (eg. "42", "0.23", "1e5") into a Number
 * `email` - Ensures an env var is an email address
 * `host` - Ensures an env var is either a domain name or an ip address (v4 or v6)
 * `port` - Ensures an env var is a TCP port (1-65535)
 * `url` - Ensures an env var is a url with a protocol and hostname
 * `json` - Parses an env var with JSON.parse
 * ```
 */
export const setConfigModel = (
  name: string,
  model: Record<string, Record<string, any>>,
  customEnv?: Record<string, any>,
) => {
  try {
    const validatedValues = validateSchema(model, customEnv || process.env);

    if (validatedValues) {
      envStore.set(name, validatedValues);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * This function returns a configuration model based on a given name.
 * @param {string} name - The `name` parameter is a string that represents the name of the
 * configuration model that we want to retrieve from the `envStore`. The `getConfigModel` function
 * takes this parameter and returns the configuration model associated with that name from the
 * `envStore`.
 * @returns The `getConfigModel` function is returning the value stored in the `envStore` object with
 * the key `name`. The type of the returned value is not specified in the code snippet.
 *
 * ```ts
 * import { getConfigModel } from '@nestjs-boilerplate/node-config-env-storage';
 *
 * const appConfigModel = getConfigModel('app').nodeEnv;
 * ```
 */
export const getConfigModel = <T>(name: string): T => {
  return envStore.get(name) as T;
};
