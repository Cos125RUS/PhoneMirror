import type {SendMessageFunction} from "../../packages/shared/src/websocket.ts";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {MessageType} from "../../packages/shared/src/websocket.ts";
import {useIsMounted} from "./useIsMounted.ts";

/**
 * Шпион за перемещениями
 * @param sendMessage функция отправки сообщений о событии
 */
export const useLocationSpy = (sendMessage: SendMessageFunction) => {
    const isMounted = useIsMounted();
    const location = useLocation();

    useEffect(() => {
        if (isMounted) {
            sendMessage(MessageType.LOCATION, location.pathname + location.search);
        }
    }, [location]);
};