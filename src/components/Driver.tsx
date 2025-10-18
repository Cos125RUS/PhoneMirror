import type {SendMessageFunction} from "../types/websocket.ts";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useLocationSpy} from "../hooks/useLocationSpy.ts";

interface Props {
    sendMessage: SendMessageFunction;
}

const Driver: React.FC<Props> = ({sendMessage}) => {
    useLocationSpy(sendMessage);
};

export default Driver;