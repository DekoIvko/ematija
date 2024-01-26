import { IoMdClose } from "react-icons/io";
import { IChat } from "../../interfaces/IChat";

import { useEffect, useRef } from "react";
import InputMessage from "../InputMessage/InputMessage";
import ChatMessages from "./ChatMessages";

interface IProps {
  usersChat: IChat[];
  removeUserChat: Function;
}

const Messages = ({ usersChat, removeUserChat }: IProps) => {
  const chatRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView(false);
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
                <ul ref={chatRef} className="flex flex-col space-y-2">
                  <ChatMessages messages={chat?.messages} chatId={chat?.id} />
                </ul>
              </div>
              <div className="absolute bottom-0 right-0 w-full ">
                <InputMessage
                  chatId={chat.id}
                  receiver={chat.senderIdTwoInfo}
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Messages;
