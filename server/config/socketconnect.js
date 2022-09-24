import { Server } from "socket.io";

const connectSocketIo = async (server) => {
  const io = new Server(server, { cors: { origin: "*" } });
  io.sockets.on("connection", (socket) => {
    logger.info("Made socket connection");
  });
};

export default connectSocketIo;
