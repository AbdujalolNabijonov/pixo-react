import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { serverApi } from "../config";

const useSocket = (token: string) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        const newSocket = io(serverApi, {
            withCredentials: true,
            transports: ["websocket"],
            auth: {
                token: token,
            },
        });

        newSocket?.on("connect", () => {
            console.log("--- SOCKET CONNECTION ---")
        })
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
            newSocket?.on("disconnect", () => {
                console.log("--- SOCKET DISCONNECTION ---")
            })
        };
    }, [token]);

    return socket;
}

export default useSocket