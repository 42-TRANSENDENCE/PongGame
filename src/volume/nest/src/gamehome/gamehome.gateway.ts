import * as WS from '@nestjs/websockets'
import { WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server, Namespace } from "socket.io";

@WS.WebSocketGateway({namespace: 'gamehome'})
export class GameHomeGateway
implements WS.OnGatewayInit
{
    game_queue : Map<string, Socket> = new Map<string, Socket>();
    @WS.WebSocketServer() nsp: Namespace;

    afterInit() {
        console.log(`gamehome : 게이트웨이 생성됨✅`);
    }

    handleConnection(@WS.ConnectedSocket() socket: Socket) {
        console.log(`gamehome : ${socket.id} 연결 됨`);
    }
    
    handleDisconnect(@WS.ConnectedSocket() socket: Socket) {
        if ( this.game_queue.has(socket.id) ) {
            // 큐에서 제거해야함.
            this.game_queue.delete(socket.id);
        }
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

    @WS.SubscribeMessage('quit_queue')
    handleQuitQueueEvent(
      @WS.ConnectedSocket() socket: Socket,
    ) {
        console.log(`gamehome : ${socket.id} 큐에서 나가기 시도`);
        
        // 아예 큐를 Service로 넘기고, 큐 관련된 메서드도 Service로 넘기면 될 듯. 
        if ( this.game_queue.delete(socket.id)  === false) {
            console.log(`gamehome : 큐에 없음`);
        } else {
            socket.emit('out_of_queue');
        }
    }

    @WS.SubscribeMessage('join_queue')
    handleQueueEvent(
      @WS.ConnectedSocket() socket: Socket,
    ) {
        console.log(`gamehome : ${socket.id} 큐에 진입시도`);
        
        // 아예 큐를 Service로 넘기고, 큐 관련된 메서드도 Service로 넘기면 될 듯. 
        if ( this.game_queue.has(socket.id) ) {
            console.log(`gamehome : 이미 큐에 있음. queuesize : ${this.game_queue.size}`);
        } else {
            this.game_queue.set(socket.id, socket);
            socket.emit("in_the_queue");
            if (this.game_queue.size > 1) {
                // queue크기가 2 이상이면 1,2번 매칭
                const p1 : Socket = this.game_queue.values().next().value;
                this.game_queue.delete(p1.id);
                p1.emit("out_of_queue");
                const p2 : Socket = this.game_queue.values().next().value;
                this.game_queue.delete(p2.id);
                p2.emit("out_of_queue");

                console.log(`gamehome : p1 is ${p1.id}`);
                console.log(`gamehome : p2 is ${p2.id}`);
                console.log(`gamehome : queuesize : ${this.game_queue.size}`);
                
                p1.emit("enter_to_game", p1.id, p2.id);
                p2.emit("enter_to_game", p1.id, p2.id);
            }
        }

    }
};
