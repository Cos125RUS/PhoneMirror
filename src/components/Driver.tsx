import type {SendMessageFunction} from "../types/websocket.ts";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLocationSpy} from "../hooks/useLocationSpy.ts";
import {useScrollSpy} from "../hooks/useScrollSpy.ts";

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
};

export default Driver;