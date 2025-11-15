import {MessageType, type SendMessageFunction} from "../../shared/src/websocket.ts";
import {useEffect} from "react";

/**
 * Шпион прокрутки экрана
 * @param sendMessage функция отправки сообщений о событии
 */
export const useScrollSpy = (sendMessage: SendMessageFunction) => {
    useEffect(() => {
        /** Перехват прокрутки экрана */
        const handleScroll = () => {
            const percent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            sendMessage(MessageType.SCROLL, `${percent}`);
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);
};