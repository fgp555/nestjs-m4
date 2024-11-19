import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(loggerGlobal);
  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Ecommerce API Henry | Frank GP')
  .setDescription('The Ecommerce API  <br> <br> <b>by <a href="https://frankgp.com">frankgp.com</a></b> ')
  .setVersion('2024')
  .addBearerAuth( )
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
