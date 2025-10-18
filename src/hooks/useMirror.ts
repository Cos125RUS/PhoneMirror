import { useState, useEffect, useRef, useCallback } from 'react';
import {Message, WebSocketMessage, MessageType, User, type SendMessageFunction} from '../types/websocket.ts';

export const useMirror = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const isWebSocketEnable = import.meta.env.VITE_ENABLE_WEBSOCKET === 'true'
    const url = import.meta.env.VITE_WS_SERVER_URL;

    useEffect(() => {
        //Веб-сокет отключён
        if (isWebSocketEnable) {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('Connected to WebSocket');
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket');
            setIsConnected(false);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        return () => {
            ws.current?.close();
        };
    }, [isMounted]);

    const sendMessage: SendMessageFunction = useCallback((type: string, message: string) => {
        if (message.trim() && ws.current && isConnected) {
            const wsMessage: WebSocketMessage = {
                type: type,
                payload: {
                    text: message.trim()
                }
            };
            ws.current.send(JSON.stringify(wsMessage));
            console.log('Сообщение отправлено');
        }
    }, [isConnected]);

    return {
        sendMessage,
        isConnected,
        ws
    };
};