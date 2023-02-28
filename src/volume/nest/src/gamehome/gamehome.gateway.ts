import * as WS from '@nestjs/websockets'
import { Socket, Server, Namespace } from "socket.io";

@WS.WebSocketGateway({
    namespace: 'gamehome',
    cors: {
      origin: ['localhost:3000/gamehome'],
    },
})

export class GameHomeGateway
implements WS.OnGatewayInit, WS.OnGatewayConnection, WS.OnGatewayDisconnect
{
    @WS.WebSocketServer() nsp: Namespace;

    afterInit() {
        console.log(`gamehome : 게이트웨이 생성됨✅`);
    }

    handleConnection(@WS.ConnectedSocket() socket: Socket) {
        console.log(`gamehome : ${socket.id} 연결 됨`);
    }
    
    handleDisconnect(@WS.ConnectedSocket() socket: Socket) {
        console.log(`gamehome : ${socket.id} 연결 끊어짐.`);
    }

    @WS.SubscribeMessage('invite')
    handleInviteEvent(
      @WS.ConnectedSocket() socket: Socket,
      @WS.MessageBody() userinfo: string,
    ) {
        console.log(`gamehome : ${userinfo}에 대한 초대 이벤트 발생 from ${socket.id}`);
    }

    @WS.SubscribeMessage('watch')
    handleWatchEvent(
      @WS.ConnectedSocket() socket: Socket,
      @WS.MessageBody() userinfo: string,
    ) {
        console.log(`gamehome : ${userinfo}에 대한 관전 이벤트 발생 from ${socket.id}`);
    }
};