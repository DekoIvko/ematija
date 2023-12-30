import { useState } from "react";
import { GetMessengerUsersService } from "../../../services/UsersService";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import { useFetchQuery } from "../../../hooks/useFetchQuery";
import useDebounce from "../../../hooks/useDebounce";
import { useErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";
import MessengerSkeleon from "../../../skeletons/MessengerSkeleon";

// react query refetch while typing
const Messenger = () => {
  console.log("Component Messenger");
  const { showBoundary } = useErrorBoundary();
  const [inputSearch, setInputSearch] = useState("");
  const debouncedFilter = useDebounce(inputSearch);

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

  const onMessengerUser = () => {
    //write some logic here
    toast("User is not available!");
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
          {isFetching && !users && <MessengerSkeleon />}
          {isSuccess && users?.data?.length === 0 ? (
            <p>No users to display</p>
          ) : (
            <></>
          )}
          {isSuccess &&
            users &&
            users?.data?.length &&
            users?.data?.map((user: IUserDetails, index: number) => {
              return (
                <li
                  key={user.email + index}
                  className="p-1 m-1 hover:bg-slate-700 cursor-pointer w-full rounded"
                >
                  <div className="flex flex-row " onClick={onMessengerUser}>
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
    </div>
  );
};

export default Messenger;
