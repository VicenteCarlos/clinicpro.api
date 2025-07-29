import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const config = new DocumentBuilder()
    .setTitle('ClinicPro API')
    .setDescription('API para gerenciamento clínicas')
    .setVersion('1.0')
    .addTag('CLINIC PRO')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({ origin: '*' })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
