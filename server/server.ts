import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { MessageType, WebSocketMessage, ClientWebSocket } from '../src/types/websocket';
import driver from "../src/components/Driver";

class WebSocketServerApp {
    private wss: WebSocketServer;
    private clients: Set<ClientWebSocket> = new Set();
    private driven: Set<ClientWebSocket> = new Set();
    private driver: ClientWebSocket;

    constructor(host: string, port: number = 3001) {
        this.wss = new WebSocketServer({host, port});
        this.setupWebSocket();
        console.log(`Listening on ${host}:${port}`);
    }

    private setupWebSocket = (): void => {
        this.wss.on('connection', (ws: ClientWebSocket) => {
            console.log('Новое подключение');
            this.clients.add(ws);

            ws.on('message', (data: Buffer) => {
                this.handleMessage(data.toString(), ws);
            });

            ws.on('close', () => {
                this.handleDisconnect(ws);
            });

            ws.on('error', (error: Error) => {
                console.error('WebSocket ошибка:', error);
                this.handleDisconnect(ws);
            });
        });
    };

    private handleMessage = (data: string, ws: ClientWebSocket): void => {
        try {
            const message: WebSocketMessage = JSON.parse(data);

            console.log(message);
            switch (message.type.trim()) {
                case MessageType.INIT:
                    if (message.payload.text === 'driver') {
                        console.log('Ведущее устройство определено');
                        this.driver = ws;
                    } else if (message.payload.text === 'driven') {
                        console.log('Определено новое ведомое устройство');
                        this.driven.add(ws);
                    }
                    break;
                case MessageType.LOCATION:
                    this.broadcast(message, driver);
                    console.log('Локация отправлена');
                    break;
                case MessageType.SCROLL:
                    this.broadcast(message, driver);
                    console.log('Процент прокрутки отправлен');
                    break;
                case MessageType.FOCUS:
                    this.broadcast(message, driver);
                    console.log('ID кликнутого поля ввода отправлен');
                    break;
                case MessageType.INPUT:
                    this.broadcast(message, driver);
                    console.log('Введённый текст отправлен');
                    break;
                case MessageType.BLUR:
                    this.broadcast(message, driver);
                    console.log('Событие сброса фокуса отправлено');
                    break;
                case MessageType.CLICK:
                    this.broadcast(message, driver);
                    console.log('ID кликнутого элемента отправлен');
                    break;
                default:
                    console.log('Неизвестный тип сообщения:', message.type);
            }
        } catch (error) {
            console.error('Ошибка обработки сообщения:', error);
        }
    };

    private handleDisconnect = (ws: ClientWebSocket): void => {
        console.log('Подключение закрыто');
        this.clients.delete(ws);
    };

    private sendToClient = (ws: ClientWebSocket, message: WebSocketMessage): void => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    };

    private broadcast = (message: WebSocketMessage, excludeWs: ClientWebSocket | null = null): void => {
        const messageStr = JSON.stringify(message);

        this.driven.forEach((client, index) => {
            console.log(index)
            if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
                console.log('isOpen')
                client.send(messageStr);
            }
        });
    };
}

// Запуск сервера
const HOST = process.env.HOST || '127.0.0.1';
const PORT = parseInt(process.env.PORT || '3001');
new WebSocketServerApp(HOST, PORT);