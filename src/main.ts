import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;  // config파일에서 server블럭 불러오기

  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
