import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {MessageType} from "../types/websocket.ts";

export const useLocationSpy = (sendMessage: SendMessageFunction) => {
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
        });

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (isMounted) {
            sendMessage(MessageType.LOCATION, location.pathname + location.search);
        }
    }, [location]);
};