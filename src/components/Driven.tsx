import {useEffect} from "react";
import {MessageType, type WebSocketMessage} from "../types/websocket.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    ws: React.RefObject<WebSocket | null>;
}

const Driven: React.FC<Props> = ({ws}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!ws || !ws.current) return;

        ws.current.onmessage = (event: MessageEvent) => {
            try {
                const message: WebSocketMessage = JSON.parse(event.data);

                switch (message.type) {
                    case MessageType.LOCATION:
                        navigate(message.payload.text);
                        break;
                    default:
                        console.error('Неизвестная команда: ', message.type);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };
    }, [ws]);
};

export default Driven;