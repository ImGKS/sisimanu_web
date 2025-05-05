import { io } from "socket.io-client";
import { BASE_URL } from "./urlConstant";

export const createSocketConnection = () => {
    // connecting client to server
    const isLocal = location.hostname === "localhost";
    
    return io(isLocal ? "http://localhost:3000" : window.location.origin, {
        path: "/socket.io", // required if server is using a custom path
        transports: ["websocket"], // force WebSocket instead of long-polling
        secure: !isLocal, // ensure secure connection on production
        withCredentials: true, // optional: needed if your API uses cookies/auth
    });

}