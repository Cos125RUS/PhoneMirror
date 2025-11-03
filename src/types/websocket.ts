export const MessageType = {
    INIT: 'init',
    LOCATION: 'location',
    SCROLL: 'scroll',
    FOCUS: 'focus',
    INPUT: 'input',
    BLUR: 'blur',
    CLICK: 'click',
} as const;

export type MessageType = typeof MessageType[keyof typeof MessageType];

export interface WebSocketMessage {
    type: MessageType;
    payload: {
        text: string;
    };
};

export type SendMessageFunction = (type: string, message: string) => void;

export const SEPARATOR = '!@#$%%$#@!';