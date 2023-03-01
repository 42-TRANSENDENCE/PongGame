import * as WS from '@nestjs/websockets'
import { Socket, Namespace } from "socket.io";

@WS.WebSocketGateway({namespace: '/ingame'})
export class GameGateway
implements WS.OnGatewayInit
{
    @WS.WebSocketServer() server: Namespace;

    games : Array<string> = [];

    afterInit() {
        console.log(`gamepage : 게이트웨이 생성됨✅`);
    }

    handleConnection(@WS.ConnectedSocket() socket: Socket) {
        console.log(`gamepage : ${socket.id} 연결 됨`);
    }
    
    handleDisconnect(@WS.ConnectedSocket() socket: Socket) {
        console.log(`gamepage : ${socket.id} 연결 끊어짐.`);
    }

    @WS.SubscribeMessage('keypress')
    haneldEvent(
      @WS.ConnectedSocket() socket: Socket,
      @WS.MessageBody() keyCode: number,
    ) {
        console.log(socket.id, keyCode)
    }

};