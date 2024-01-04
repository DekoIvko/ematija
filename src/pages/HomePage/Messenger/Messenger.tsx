import { useState } from "react";
import { GetMessengerUsersService } from "../../../services/UsersService";
import { useFetchQuery } from "../../../hooks/useFetchQuery";
import useDebounce from "../../../hooks/useDebounce";
import { useErrorBoundary } from "react-error-boundary";
import MessengerSkeleton from "../../../skeletons/MessengerSkeleton";
import { IUser } from "../../../interfaces/IUser";
import { IoMdClose } from "react-icons/io";

const Messenger = () => {
  console.log("Component Messenger");
  const { showBoundary } = useErrorBoundary();
  const [inputSearch, setInputSearch] = useState("");
  const debouncedFilter = useDebounce(inputSearch); // debounce while typing default is 500ms
  const [usersChat, setUsersChat] = useState<IUser[]>([]);

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

  if (isError) {
    showBoundary(error);
  }

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onMessengerUser = (user: IUser) => {
    setUsersChat((prevArr) => [...prevArr, user]);
  };

  const removeUserChat = (user: IUser) => {
    const removedUser = [...usersChat].filter(
      (userArr) => userArr.id !== user.id
    );
    setUsersChat(removedUser);
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
            users?.data?.map((user: IUser, index: number) => {
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
      <div className="flex gap-2 absolute bottom-0 right-0">
        {usersChat &&
          usersChat.map((user) => {
            return (
              <div key={`${user.id}_${user.username}`}>
                <div className="flex flex-row ">
                  <img
                    src={user?.image}
                    alt=""
                    className="max-w-[24px] mr-1 rounded-xl"
                  />
                  <div className="">{`${user?.firstName} ${user.lastName}`}</div>
                  <div className="max-w-[150px] max-h-[350px]"></div>
                  <IoMdClose
                    size={20}
                    onClick={() => removeUserChat(user)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Messenger;
