import { Socket, Server } from "socket.io";
export declare class EventGateway {
    server: Server;
    afterInit(): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleMessage(socket: Socket, message: string): {
        username: string;
        message: string;
    };
}
