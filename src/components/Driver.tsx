import type {SendMessageFunction} from "../types/websocket.ts";
import {useLocationSpy} from "../hooks/useLocationSpy.ts";
import {useScrollSpy} from "../hooks/useScrollSpy.ts";
import {useInputSpy} from "../hooks/useInputSpy.ts";

interface Props {
    sendMessage: SendMessageFunction;
}

/**
 * Компонент ведущего устройства
 * @param sendMessage функция отправки сообщения о событии
 * @constructor
 */
const Driver: React.FC<Props> = ({sendMessage}) => {
    useLocationSpy(sendMessage);
    useScrollSpy(sendMessage);
    useInputSpy(sendMessage);

    return null;
};

export default Driver;