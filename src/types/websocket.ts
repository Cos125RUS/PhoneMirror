export enum MessageType {
    INIT = 'init',
    LOCATION = 'location',
    SCROLL = 'scroll',
    CLICK = 'click',
    INPUT = 'input',
};

export interface WebSocketMessage {
    type: MessageType;
    payload: {
        text: string;
    };
};

export type SendMessageFunction = (type: string, message: string) => void;

export const SEPARATOR = '!@#$%%$#@!';