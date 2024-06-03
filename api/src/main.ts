import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:3000' });
  app.useLogger(new Logger());

  app.use(
    session({
      secret: 'your_secret_key', // TODO:use env variable
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  setAPIDocumentation(app);

  await app.listen(3001);
}

async function setAPIDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Dealt API')
    .setDescription('The Dealt API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}

bootstrap();
