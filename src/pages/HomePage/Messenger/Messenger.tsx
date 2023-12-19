import { useState } from "react";
import { GetMessengerUsersService } from "../../../services/UsersService";
import { Loader } from "../../../components";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import { useFetchQuery } from "../../../hooks/useFetchQuery";
import useDebounce from "../../../hooks/useDebounce";
import { useErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";

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
    isLoading,
  } = useFetchQuery(
    () => GetMessengerUsersService(debouncedFilter),
    `messenger ${debouncedFilter}`
  );

  if (isError) {
    showBoundary(error);
  }
  if (isLoading) {
    <Loader />;
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
          {users ? (
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
            })
          ) : (
            <p>No users to display</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Messenger;
