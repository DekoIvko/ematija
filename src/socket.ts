import toast from "react-hot-toast";
import { io } from "socket.io-client";

const URL = "http://localhost:5000";

const socket = io(URL, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"],
});
socket.on("showNotification", (data) => {
  const notify = `
  ${data.title}
  ${data.body} from ${data.fullName}
  time: ${new Date(data.timestamp).toISOString().slice(0, 10)}
  `;
  toast(notify, { position: "top-right" });
});

export default socket;
