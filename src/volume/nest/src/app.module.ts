import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module'
import { GameHomeModule } from './gamehome/gamehome.module'
@Module({
  imports: [
    //여기 다른 많은 모듈들이 들어가는 듯?
    GameHomeModule,
    GameModule,
  ]
})

export class AppModule {}
