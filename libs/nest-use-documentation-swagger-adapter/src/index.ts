import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const documentationSwaggerAdapter = (app: any, config: any) => {
  const {
    APP_DOCS_TITLE,
    APP_DOCS_VERSION,
    APP_DOCS_DESCRIPTION,
    APP_DOCS_ROUTE = "api",
  } = config;

  if (!APP_DOCS_ROUTE) {
    throw new Error("APP_DOCS_ROUTE is not defined");
  }
  if (!APP_DOCS_TITLE) {
    throw new Error("APP_DOCS_TITLE is not defined");
  }
  if (!APP_DOCS_VERSION) {
    throw new Error("APP_DOCS_VERSION is not defined");
  }
  if (!APP_DOCS_DESCRIPTION) {
    throw new Error("APP_DOCS_DESCRIPTION is not defined");
  }

  const options = new DocumentBuilder()
    .setTitle(APP_DOCS_TITLE)
    .setDescription(APP_DOCS_VERSION)
    .setVersion(APP_DOCS_DESCRIPTION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(APP_DOCS_ROUTE, app, document);
};

export {
  GetOptionInt,
  RequiredArray,
  GetOptionDate,
  RequiredNumber,
  RequiredString,
  RequiredObject,
  GetOptionNumber,
  GetOptionString,
  RequiredBoolean,
  RequiredPassword,
  NotRequiredArray,
  GetOptionBoolean,
  NotRequiredObject,
  GetOptionIntRange,
  NotRequiredString,
  NotRequiredNumber,
  NotRequiredBoolean,
  RequiredSimpleArray,
  GetOptionStringArray,
  GetOptionNumberArray,
  NotRequiredSimpleArray,
} from "./decorators/columns";

export {
  PageDto,
  SuccessDto,
  PageMetaDto,
  PageOptionsDto,
  UpdateOrderDto,
  UpdateOrdersDto,
} from "./dto";
