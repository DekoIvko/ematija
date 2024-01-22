import { useState } from "react";
import { useFetchQuery } from "../../../hooks/useFetchQuery";
import useDebounce from "../../../hooks/useDebounce";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import { useErrorBoundary } from "react-error-boundary";
import MessengerSkeleton from "../../../skeletons/MessengerSkeleton";
import { IUser } from "../../../interfaces/IUser";

import Messages from "../../../components/Messages/Messages";
import { GetMessengerUsersService } from "../../../services/UsersService";
import { useMutation } from "@tanstack/react-query";
import { CheckChatIdService } from "../../../services/MessagesService";
import { IChat } from "../../../interfaces/IChat";

const Messenger = () => {
  console.log("Component Messenger");
  const loggedUser = useUserAuthContext();

  const { showBoundary } = useErrorBoundary();
  const [inputSearch, setInputSearch] = useState("");
  const debouncedFilter = useDebounce(inputSearch); // debounce while typing default is 500ms
  const [usersChat, setUsersChat] = useState<IChat[]>([]);

  const {
    data: users,
    isError,
    error,
    isFetching,
    isSuccess,
  } = useFetchQuery(
    () => GetMessengerUsersService(debouncedFilter),
    `messenger ${debouncedFilter}`
  );

  const getChat = useMutation({
    mutationFn: CheckChatIdService,
    onSuccess: (result, variables) => {
      console.log(result, variables);
      setUsersChat((prevArr) => [...prevArr, result]);
    },
  });

  if (isError) {
    showBoundary(error);
  }

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onMessengerUser = (user: IUser) => {
    getChat.mutate({
      senderIdOne: loggedUser.user.id,
      senderIdTwo: user.id,
    });
  };

  const removeUserChat = (chat: IChat) => {
    const removedChat = [...usersChat].filter(
      (chatArr) => chatArr.id !== chat.id
    );
    setUsersChat(removedChat);
  };

  const sendFormMessage = async (e: any) => {
    e.preventDefault();
    // const param = {
    //   chatId: Number,
    //   senderId: Number,
    //   timestamp: String,
    //   message: String,
    // };

    // setMessage("");
  };

  return (
    <div className="container flex flex-col p-2 " data-bs-spy="scroll">
      <div className=" pl-2 text-xl">
        <h3>Contacts</h3>
      </div>
      <div className="p-2 w-full">
        <input
          onChange={searchInputHandler}
          type="text"
          placeholder="Search..."
          className="w-full rounded bg-slate-200 text-slate-800 p-1"
        />
      </div>
      <div className="">
        <ul className="flex flex-col overflow-y-auto overflow-x-hidden max-h-[78vh]">
          {isFetching && !users && <MessengerSkeleton />}
          {isSuccess && users?.data?.length === 0 ? (
            <p>No users to display</p>
          ) : (
            <></>
          )}
          {isSuccess &&
            users &&
            users?.data?.length &&
            users?.data
              ?.filter((user: IUser) => user.id !== loggedUser?.user.id)
              ?.map((user: IUser, index: number) => {
                return (
                  <li
                    key={user.email + index}
                    className="p-1 m-1 hover:bg-slate-700 cursor-pointer w-full rounded"
                  >
                    <div
                      className="flex flex-row "
                      onClick={() => onMessengerUser(user)}
                    >
                      <img
                        src={user?.image}
                        alt=""
                        className="max-w-[24px] mr-1 rounded-xl"
                      />
                      <div className="">{`${user?.firstName} ${user.lastName}`}</div>
                    </div>
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="flex gap-2 fixed bottom-0 right-0 h-80 mr-1">
        <Messages
          usersChat={usersChat}
          sendFormMessage={sendFormMessage}
          removeUserChat={removeUserChat}
        />
      </div>
    </div>
  );
};

export default Messenger;
