import { Module } from '@nestjs/common'
import { GameHomeGateway } from './gamehome.gateway'

@Module ({
    providers: [GameHomeGateway],
    // controllers: [GameController]
})

export class GameHomeModule {}