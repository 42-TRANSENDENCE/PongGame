import { createContext } from "react"
import {io, Socket} from 'socket.io-client'

export const gameSocket = io("ws://localhost:3001/game", {
                              transports: ["websocket"]
                            });

export const GameContext = createContext<Socket>(gameSocket);