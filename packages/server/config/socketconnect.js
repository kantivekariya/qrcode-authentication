import { Server } from "socket.io";
import logger from "../services/logger";

let io;

const connectSocketIo = async (server) => {
  io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    logger.info("Made socket connection : SocketID - " + socket.id);

    socket.on("disconnect", () => {
      logger.info("Disconnected : SocketID - ", socket.id);
    });

    socket.on("error", async (err) => {
      logger.error(
        `Socket Error : SocketID - ${socket.id}, Error : ${err.message}`
      );
    });
  });
};

const emitToSpecificSocket = (socketId, eventName, socketPayload) => {
  logger.info(
    `Socket : emitToRoom :
  socketId : ${socketId}
  eventName: ${eventName}
  socketPayload: ${JSON.stringify(socketPayload, null, 2)}`
  );
  io.to(socketId).emit(eventName, socketPayload);
  logger.info("Socket : emitToSpecificSocket : event sent");
};

export { connectSocketIo, emitToSpecificSocket };
