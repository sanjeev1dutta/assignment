import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const port = process?.env?.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Car Rental Gateway')
    .setDescription('The Car Rental Gateway API description')
    .setVersion('1.0')
    .addTag(`Car Rental Gateway - Platform for Distributors`)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, () => {
    console.log(`Car Rental Gateway endpoint listening on port: ${port}`);
  });
}
bootstrap();
