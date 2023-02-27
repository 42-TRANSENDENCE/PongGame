import * as WS from '@nestjs/websockets'
import { Socket, Server, Namespace } from "socket.io";

@WS.WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000']
    }
})

export class GameGateway
{
    @WS.WebSocketServer() server: Server;

    afterInit() {
    this.server.on('create-room', (room) => {
        console.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.server.on('join-room', (room, id) => {
        console.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.server.on('leave-room', (room, id) => {
        console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.server.on('delete-room', (roomName) => {
        console.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });

    console.log('웹소켓 서버 초기화 ✅');
    }

    // 소켓 연결되면 실행
    handleConnection(@WS.ConnectedSocket() socket: Socket) {
        console.log(`${socket.id} 연결 됨`);
    }
    
    handleDisconnect(@WS.ConnectedSocket() socket: Socket) {
        console.log(`${socket.id} 연결 끊어짐.`);
    }

    @WS.SubscribeMessage('message')
    handleMessage(
      @WS.ConnectedSocket() socket: Socket,
      @WS.MessageBody() message: string,
    ) {
        socket.broadcast.emit('message', { username: socket.id, message });
        return { username: socket.id, message };
    }
};