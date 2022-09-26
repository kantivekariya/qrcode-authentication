import io from "socket.io-client";
let socket = io(
  process.env.REACT_APP_SOCKET_CONNECTION_URL || `http://localhost:8000`
);
export default socket;
