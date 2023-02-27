"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const WS = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let GameGateway = class GameGateway {
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
    handleConnection(socket) {
        console.log(`${socket.id} 연결 됨`);
    }
    handleDisconnect(socket) {
        console.log(`${socket.id} 연결 끊어짐.`);
    }
    handleMessage(socket, message) {
        socket.broadcast.emit('message', { username: socket.id, message });
        return { username: socket.id, message };
    }
};
__decorate([
    WS.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    __param(0, WS.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, WS.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleDisconnect", null);
__decorate([
    WS.SubscribeMessage('message'),
    __param(0, WS.ConnectedSocket()),
    __param(1, WS.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMessage", null);
GameGateway = __decorate([
    WS.WebSocketGateway({
        cors: {
            origin: ['http://localhost:3000']
        }
    })
], GameGateway);
exports.GameGateway = GameGateway;
;
//# sourceMappingURL=game.gateway.js.map