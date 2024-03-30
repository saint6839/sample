import {
  url,
  str,
  num,
  host,
  port,
  json,
  bool,
  email,
  cleanEnv,
} from "envalid";

/**
 * The function "transform" takes in a type and value, and returns the value in the specified type
 * (number, boolean, or JSON).
 * @param {string} type - The type of transformation to be applied to the value. It can be one of the
 * following: 'number', 'bool', 'json', or any other value.
 * @param {any} value - The value that needs to be transformed based on the given type.
 * @returns The `transform` function returns a transformed value based on the given `type` parameter.
 */
const transform = (type: string, value: any) => {
  if (type === "number") {
    return parseInt(value, 10);
  }
  if (type === "bool") {
    if (value === "1" || value === "true" || value === "t") {
      return true;
    }

    return false;
  }
  if (type === "json") {
    return JSON.parse(value);
  }
  return value;
};

/**
 * The function sets a validator based on the type of input provided.
 * @param {string} type - a string representing the type of data to be validated. The function returns
 * a validator function based on this type. The possible values for type are 'string', 'bool',
 * 'number', 'email', 'host', 'port', 'url', and 'json'.
 * @returns The function `setValidator` returns a validator function based on the input `type`
 */
const setValidator = (type: string) => {
  let validator: any;
  switch (type) {
    case "string":
      validator = str;
      break;
    case "bool":
      validator = bool;
      break;
    case "number":
      validator = num;
      break;
    case "email":
      validator = email;
      break;
    case "host":
      validator = host;
      break;
    case "port":
      validator = port;
      break;
    case "url":
      validator = url;
      break;
    case "json":
      validator = json;
      break;
    default:
      validator = str;
  }
  return validator;
};

/**
 * The `validateSchema` function is a function that validates the environment variables
 * @param model - The `model` parameter is a JavaScript object that contains key-value pairs where the
 * @param envs - The `envs` parameter is a JavaScript object that contains key-value pairs where the
 * @returns - The `validateSchema` function is returning a boolean value. The type of the returned value
 *
 * ```ts
 * model value must have the following properties:
 * `key` - A string representing the name of the environment variable
 * `type` - A string representing the type of the environment variable
 * `default` - A string representing the default value of the environment variable
 * `description` - A string representing the description of the environment variable
 * ```
 *
 * ```ts
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
export const validateSchema = (
  model: Record<string, any>,
  envs: Record<string, any>,
) => {
  const validatedModelValues: Record<string, any> = {};
  const schemaForCleanEnv: Record<string, any> = {};

  Object.entries(model).forEach(([envKey, value]) => {
    const { type, default: defaultValue } = value;

    // Setup validator for each key
    const validator = setValidator(type);

    schemaForCleanEnv[envKey] = validator({
      ...value,
      desc: `${envKey}=${value.description} [as ${type}]`,
    });

    validatedModelValues[envKey] = envs[envKey]
      ? transform(type, envs[envKey])
      : defaultValue;
  });

  // Validate the environment variables
  cleanEnv(envs, schemaForCleanEnv);

  return validatedModelValues;
};
