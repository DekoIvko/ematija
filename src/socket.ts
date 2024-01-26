import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { appConfig } from "./appConfig";

const URL = appConfig.localApiUrl;

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
