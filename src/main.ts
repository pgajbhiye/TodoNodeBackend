import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {

  const server  = config.get("server");
  const app = await NestFactory.create(AppModule);
  console.log("starting on port ",server.port);
  await app.listen(server.port);
}
bootstrap();
