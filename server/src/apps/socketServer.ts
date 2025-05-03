import { Server as SocketIOServer, Socket } from "socket.io";

const socketUserMap = new Map<string, string>();

export function setupSocket(io: SocketIOServer) {
  io.use(async (socket: Socket, next) => {
    next();
  });

  io.on("connection", (socket: Socket) => {
    const customSocket = socket as Socket;
    console.log("Client connected:", socket.id);

    socket.on("auth/user", (userId: string) => {
      throw new Error("Event not implemented");
    });
  });
}
