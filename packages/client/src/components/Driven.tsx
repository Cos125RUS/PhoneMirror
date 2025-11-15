import {useEffect} from "react";
import {MessageType, SEPARATOR, type WebSocketMessage} from "../../packages/shared/src/websocket.ts";
import {useNavigate} from "react-router-dom";
import {simulateInput} from "../utils/simulateInput.ts";
import {simulateBlur} from "../utils/simulateBlur.ts";
import {simulateClick} from "../utils/simulateClick.ts";

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
                    case MessageType.FOCUS:
                        document.getElementById(message.payload.text)?.focus();
                        break;
                    case MessageType.INPUT:
                        const [id, text] = message.payload.text.split(SEPARATOR);
                        simulateInput(id, text);
                        break;
                    case MessageType.BLUR:
                        simulateBlur(message.payload.text);
                        break;
                    case MessageType.CLICK:
                        simulateClick(message.payload.text);
                        break;
                    default:
                        console.error('Неизвестная команда: ', message.type);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };
    }, [ws]);

    return null;
};

export default Driven;