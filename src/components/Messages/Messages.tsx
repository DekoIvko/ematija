import { FormEventHandler, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoPaperAirplane } from "react-icons/go";
import { IMessages } from "../../interfaces/IMessages";
import { useUserAuthContext } from "../../context/UserAuthContext";
import { format } from "timeago.js";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { IChat } from "../../interfaces/IChat";

interface IProps {
  usersChat: IChat[];
  sendFormMessage: FormEventHandler<HTMLFormElement>;
  removeUserChat: Function;
}

const Messages = ({ usersChat, sendFormMessage, removeUserChat }: IProps) => {
  const loggedUser = useUserAuthContext();
  const [message, setMessage] = useState("");

  //   const {
  //     data: dataMessages,
  //     isError,
  //     error,
  //     isFetching,
  //     isSuccess,
  //   } = useFetchQuery(
  //     () => GetAllMessagesService(debouncedFilter),
  //     `messages ${debouncedFilter}`
  //   );

  useEffect(() => {
    console.log(usersChat);
  }, [usersChat]);

  return (
    <>
      {usersChat &&
        usersChat?.map((chat: IChat) => {
          return (
            <div
              key={`${chat?.id}_${chat?.senderIdTwo}`}
              className="m-2 w-60 relative bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="flex justify-between flex-row p-1">
                <div className="flex">
                  <img
                    src={chat?.senderIdTwoInfo?.image}
                    alt=""
                    className="max-w-[16px] mr-1 rounded-xl"
                  />
                  <span className="">{`${chat?.senderIdTwoInfo?.firstName} ${chat?.senderIdTwoInfo?.lastName}`}</span>
                </div>
                <div className="">
                  <IoMdClose
                    size={20}
                    onClick={() => removeUserChat(chat)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-1 h-56 relative w-full overflow-y-auto">
                <ul className="flex flex-col space-y-2">
                  {chat?.messages?.map((message: IMessages) => {
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
                          <span className="block font-normal">
                            {message?.message}
                          </span>
                        </div>
                        <span className="block text-xs text-gray-700 dark:text-gray-400">
                          {format(message?.timestamp)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="absolute bottom-0 right-0 w-full ">
                <form onSubmit={sendFormMessage}>
                  <div className="flex items-center justify-between w-full p-1 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <input
                      id={chat.id.toString()}
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
                      />
                    </button>
                  </div>
                </form>
              </div>{" "}
            </div>
          );
        })}
    </>
  );
};

export default Messages;
