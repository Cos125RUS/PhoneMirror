import {useMirror} from "../hooks/useMirror.ts";
import {useEffect, useState} from "react";
import {useDevice} from "../hooks/useDevice.ts";
import {MessageType} from "../types/websocket.ts";
import Driver from "./Driver.tsx";
import Driven from "./Driven.tsx";

const Mirror = () => {
    const {sendMessage, isConnected, ws} = useMirror();
    const DEVICE_TYPES = {
        driver: () => <Driver sendMessage={sendMessage}/>,
        driven: () => () => <Driven ws={ws}/>,
    };
    const {isDesktop} = useDevice();
    const [deviceType, setDeviceType] = useState<keyof DEVICE_TYPE | null>();

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

export default Mirror;