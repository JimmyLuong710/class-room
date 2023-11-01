import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ResponseTransformInterceptor } from 'modules/shared/interceptors/response.interceptor';
import { HttpExceptionFilter } from 'modules/shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('app.prefix'));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseTransformInterceptor(configService));
  app.useGlobalFilters(new HttpExceptionFilter());

  await setupSwagger(app);
  await startPort(app);
}

async function setupSwagger(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);
  const docBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(configService.get('app.name'))
    .setDescription(configService.get('app.name'))
    .setVersion(configService.get('app.prefix'));

  for (const server of configService.get('app.swagger.servers')) {
    docBuilder.addServer(server.url);
  }

  const options = docBuilder.build();
  const document = SwaggerModule.createDocument(app, options);

  try {
    const outputSwaggerFile = `${process.cwd()}/output-specs/lagom-admin.json`;
    fs.writeFileSync(outputSwaggerFile, JSON.stringify(document, null, 2), {
      encoding: 'utf8',
    });
    console.log('write outputSwaggerFile');
  } catch (e) {
    console.warn(`Could not write swagger docs to file: ${e}`);
  }

  SwaggerModule.setup(`${configService.get('app.prefix')}/docs`, app, document, {
    customSiteTitle: configService.get('app.name'),
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      displayRequestDuration: true,
    },
  });
}

async function startPort(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('app.port'));

  const logger = new Logger('NestApplication');
  const appUrl = await app.getUrl();
  logger.log(`Application is running on: ${appUrl}`);
  logger.log(`Swagger is running on: ${appUrl}/${configService.get<string>('app.prefix')}/docs`);
}

bootstrap();
