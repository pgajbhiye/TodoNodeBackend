import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {

  const server  = config.get("server");
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || server.port);
  console.log("starting on port ", process.env.PORT || server.port);
}
bootstrap();
