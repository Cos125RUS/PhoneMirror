import {useEffect, useRef, useState} from "react";
import {MessageType, type SendMessageFunction, SEPARATOR} from "../types/websocket.ts";

const INPUT_TYPES = ['text', 'email', 'phone', 'password'];
const EXCLUDES_KEYS = ['Enter', 'Shift', 'Control', 'Alt'];

/**
 * Шпион за вводом текста
 * @param sendMessage функция отправки сообщений о событии
 */
export const useInputSpy = (sendMessage: SendMessageFunction) => {
    const element = useRef<HTMLElement | null>();
    const [isHandlingKeyDown, setIsHandlingKeyDown] = useState(false);

    //Перехват кликов
    useEffect(() => {
        /** Перехватчик ввода текста */
        const handleInput = (e: MouseEvent) => {
            if (element.current && element.current !== e.target) {
                element.current = null;
                setIsHandlingKeyDown(() => false);
            }

            //Клик по input
            if (e.target.localName === 'input') {
                element.current = e.target;
                sendMessage(MessageType.CLICK, e.target.id);

                //Активируем слушатель клавиш при клике по текстовым полям
                if (INPUT_TYPES.includes(e.target.attributes.type.value)) {
                    setIsHandlingKeyDown(() => true);
                }
            }

            //Клик по textaria
            if (e.target.localName === 'textarea') {
                element.current = e.target;
                setIsHandlingKeyDown(() => true);
                sendMessage(MessageType.CLICK, e.target.id);
            }
        };

        document.addEventListener('click', handleInput);

        return () => {
            document.removeEventListener('click', handleInput);
        };
    }, []);

    //Перехват нажатий клавиш
    useEffect(() => {
        let timer: NodeJS.Timeout | number;

        /** Перехват нажатий клавиш */
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                element.current = null;
                setIsHandlingKeyDown(() => false);
            } else if (e.key === 'Tab') {
                //TODO добавить обработку перемещения при помощи таба
            } else if (!/F(1[0-2]|[1-9])/.test(e.key) && !EXCLUDES_KEYS.includes(e.key)) {
                timer = setTimeout(() => {
                    sendMessage(MessageType.INPUT, `${element.current.id}${SEPARATOR}${element.current.value}`);
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