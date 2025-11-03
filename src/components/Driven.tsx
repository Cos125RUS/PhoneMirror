import {useEffect} from "react";
import {MessageType, SEPARATOR, type WebSocketMessage} from "../types/websocket.ts";
import {useNavigate} from "react-router-dom";
import {simulateInput} from "../utils/simulateInput.ts";
import {simulateBlur} from "../utils/simulateBlur.ts";

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
                    case MessageType.SCROLL:
                        const scrollTop = +message.payload.text * (document.documentElement.scrollHeight - window.innerHeight);
                        window.scroll({top: scrollTop, behavior: "smooth"});
                        break;
                    case MessageType.CLICK:
                        document.getElementById(message.payload.text).focus();
                        break;
                    case MessageType.INPUT:
                        const [id, text] = message.payload.text.split(SEPARATOR);
                        simulateInput(id, text);
                        break;
                    case MessageType.BLUR:
                        simulateBlur(message.payload.text);
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