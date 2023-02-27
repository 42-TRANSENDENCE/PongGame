import * as WS from '@nestjs/websockets'
import { Socket, Namespace } from "socket.io";

@WS.WebSocketGateway({
    namespace: 'game',
    cors: {
      origin: ['ws://localhost:3000'],
    },
})

// 안 되는 코드
// @WS.WebSocketGateway(3000, {
//     namespace: 'game',
//     transports: ['websocket']
// })

export class GameGateway
{
    @WS.WebSocketServer() server: Namespace;

    handleConnection(@WS.ConnectedSocket() socket: Socket) {
        console.log(`${socket.id} 연결 됨`);
    }
    
    handleDisconnect(@WS.ConnectedSocket() socket: Socket) {
        console.log(`${socket.id} 연결 끊어짐.`);
    }

    @WS.SubscribeMessage('keypress')
    haneldEvent(
      @WS.ConnectedSocket() socket: Socket,
      @WS.MessageBody() keyCode: number,
    ) {
        console.log(socket.id, keyCode)
    }
};