import { format } from "timeago.js";
import { IMessages } from "../../interfaces/IMessages";
import { useUserAuthContext } from "../../context/UserAuthContext";
import socket from "../../socket";
import { useEffect } from "react";

interface IProps {
  messages: IMessages[] | any;
  chatId: number;
}

const ChatMessages = ({ messages, chatId }: IProps) => {
  const loggedUser = useUserAuthContext();

  useEffect(() => {
    socket.on("messages", async (data) => {
      console.log(messages);
      messages.push(data);
    });
    return () => {
      socket.off("messages");
    };
  }, [messages]);

  return (
    <>
      {messages?.map((message: IMessages) => {
        return (
          <li
            key={message.id}
            className={`flex flex-col max-w-fit ${
              message?.senderId !== loggedUser?.user.id
                ? "self-start"
                : "self-end"
            }`}
          >
            <div
              className={`relative px-2 py-1 m-1 rounded-lg shadow ${
                message?.senderId === loggedUser?.user.id
                  ? "text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
                  : "bg-blue-600 dark:bg-blue-500 text-white"
              }`}
            >
              <span className="block font-normal">{message?.message}</span>
            </div>
            <span className="block text-xs text-gray-700 dark:text-gray-400">
              {format(message?.timestamp)}
            </span>
          </li>
        );
      })}
    </>
  );
};

export default ChatMessages;
