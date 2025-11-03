import {useEffect, useRef, useState} from "react";
import {MessageType, type SendMessageFunction, SEPARATOR} from "../types/websocket.ts";

const INPUT_TYPES = ['text', 'email', 'phone', 'password'];
const EXCLUDES_KEYS = ['Enter', 'Shift', 'Control', 'Alt'];

/**
 * Шпион за вводом текста
 * @param sendMessage функция отправки сообщений о событии
 */
export const useInputSpy = (sendMessage: SendMessageFunction) => {
    const element = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const [isHandlingKeyDown, setIsHandlingKeyDown] = useState(false);

    //Перехват кликов
    useEffect(() => {
        /** Перехватчик ввода текста */
        const handleInput = (e: MouseEvent) => {
            if (!e.target) return;

            const targetElement = e.target as HTMLElement;

            if (element.current && element.current !== targetElement) {
                sendMessage(MessageType.BLUR, element.current.id);
                element.current = null;
                setIsHandlingKeyDown(() => false);
            }

            //Клик по input
            if (targetElement.localName === 'input') {
                const inputElement = targetElement as HTMLInputElement;
                element.current = inputElement;
                sendMessage(MessageType.CLICK, targetElement.id);
                sendMessage(MessageType.FOCUS, targetElement.id);

                //Активируем слушатель клавиш при клике по текстовым полям
                if (INPUT_TYPES.includes(inputElement.type)) {
                    setIsHandlingKeyDown(() => true);
                }
            }

            //Клик по textaria
            if (targetElement.localName === 'textarea') {
                element.current = targetElement as HTMLTextAreaElement;
                setIsHandlingKeyDown(() => true);
                sendMessage(MessageType.FOCUS, targetElement.id);
            }

            //Клик по кнопке
            if (targetElement.localName === 'button') {
                const btn = targetElement as HTMLButtonElement;
                sendMessage(MessageType.CLICK, btn.id);
            }
        };

        document.addEventListener('click', handleInput);

        return () => {
            document.removeEventListener('click', handleInput);
        };
    }, []);

    //Перехват нажатий клавиш
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | number;

        /** Перехват нажатий клавиш */
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!element || !element.current) return;

            if (e.key === 'Escape') {
                sendMessage(MessageType.BLUR, element.current.id);
                element.current = null;
                setIsHandlingKeyDown(() => false);
            } else if (e.key === 'Tab') {
                //TODO добавить обработку перемещения при помощи таба
            } else if (!/F(1[0-2]|[1-9])/.test(e.key) && !EXCLUDES_KEYS.includes(e.key)) {
                timer = setTimeout(() => {
                    if (element && element.current) {
                        sendMessage(MessageType.INPUT, `${element.current.id}${SEPARATOR}${element.current.value}`);
                    }
                }, 300);
            }
        };

        if (isHandlingKeyDown) {
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                clearTimeout(timer as number);
                document.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [isHandlingKeyDown]);
};