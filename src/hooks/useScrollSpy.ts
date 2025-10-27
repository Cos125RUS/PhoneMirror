import {MessageType, type SendMessageFunction} from "../types/websocket.ts";
import {useIsMounted} from "./useIsMounted.ts";
import {useEffect} from "react";

/**
 * Шпион прокрутки экрана
 * @param sendMessage функция отправки сообщений о событии
 */
export const useScrollSpy = (sendMessage: SendMessageFunction) => {
    const isMounted = useIsMounted();

    useEffect(() => {
        /** Перехват прокрутки экрана */
        const handleScroll = (e: Event) => {
            const percent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            sendMessage(MessageType.SCROLL, `${percent}`);
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);
};