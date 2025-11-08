import {useMirror} from "../hooks/useMirror.ts";
import {useEffect, useState} from "react";
import {useDevice} from "../hooks/useDevice.ts";
import {MessageType} from "../types/websocket.ts";
import Driver from "./Driver.tsx";
import Driven from "./Driven.tsx";

type DEVICE_TYPES = 'driver' | 'driven';

/**
 * Отзеркаливание действий десктопа на сопряжённые мобильные устройства
 * @constructor
 */
const PhoneMirror: React.FC = () => {
    const {sendMessage, isConnected, ws} = useMirror();
    const {isDesktop} = useDevice();
    const [deviceType, setDeviceType] = useState<DEVICE_TYPES | null>(null);

    useEffect(() => {
        if (isConnected) {
            if (isDesktop) {
                sendMessage(MessageType.INIT, 'driver');
                setDeviceType('driver');
            } else {
                sendMessage(MessageType.INIT, 'driven');
                setDeviceType('driven');
            }
        }
    }, [isConnected]);

    return deviceType
        ? deviceType === 'driver'
            ? <Driver sendMessage={sendMessage}/>
            : <Driven ws={ws}/>
        : null;
};

export default PhoneMirror;