export enum MessageType {
    INIT = 'init',
    LOCATION = 'location',
}

export interface WebSocketMessage {
    type: MessageType;
    payload: {
        text: string;
    };
}

export type SendMessageFunction = (type: string, message: string) => void;