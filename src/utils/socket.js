import { io } from "socket.io-client";
import { BASE_URL } from "./urlConstant";

export const createSocketConnection = () => {
    // connecting client to server
    const isLocal = location.hostname === "localhost";
    
    return io(
        isLocal ? "http://localhost:3000" : "https://sisimanu-api.onrender.com",
        {
          path: "/socket.io",
          transports: ["websocket"],
          secure: !isLocal,
          withCredentials: true,
        }
    );

}