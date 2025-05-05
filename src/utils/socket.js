import { io } from "socket.io-client";
import { BASE_URL } from "./urlConstant";

export const createSocketConnection = () => {
    // connecting client to server
    if(location.hostname === "localhost") {
        return io(BASE_URL);
    } else {
        return io("/", { path: "/socket.io"})
    }
}