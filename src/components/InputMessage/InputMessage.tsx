import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { GoPaperAirplane } from "react-icons/go";
import { AddMessageService } from "../../services/MessagesService";
import { useUserAuthContext } from "../../context/UserAuthContext";
import socket from "../../socket";
import { IUser } from "../../interfaces/IUser";

interface IProps {
  chatId: number;
  receiver: IUser | any;
}

const InputMessage = ({ chatId, receiver }: IProps) => {
  const loggedUser = useUserAuthContext();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  // to do, send message to back-end and to the chat Service --> AddMessageService

  const addMessage = useMutation({
    mutationFn: AddMessageService,
    onSuccess: (result, variables) => {
      setMessage((prevMess) => (prevMess = ""));
    },
  });

  const onSubmitMessage = async () => {
    if (message && message.length > 0) {
      const newMessage = {
        chatId,
        senderId: loggedUser.user.id,
        timestamp: new Date().toISOString(),
        message,
      };
      await addMessage.mutate(newMessage);
      await queryClient.refetchQueries(["chats", chatId]);
      socket.emit("messages", newMessage);
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-1 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <input
        id={chatId?.toString()}
        type="text"
        placeholder="Write a message"
        className="block w-full py-2 pl-4 mx-2 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">
        <GoPaperAirplane
          className="h-6 w-6 text-blue-600 dark:text-blue-500 "
          aria-hidden="true"
          onClick={onSubmitMessage}
        />
      </button>
    </div>
  );
};

export default InputMessage;
