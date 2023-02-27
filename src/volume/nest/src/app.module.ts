import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module'

@Module({
  imports: [
    //여기 다른 많은 모듈들이 들어가는 듯?
    GameModule
  ],
})

export class AppModule {}
