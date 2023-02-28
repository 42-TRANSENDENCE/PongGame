import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {} from 'socket.io'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //여기서 쿠키 설정도 하고? 여러 설정하는 것 같음.

  await app.listen(3001); // 일단 3001번 포트로 열기만 함.
  console.log("BE server is Listenig to :::3001");
}

bootstrap();
