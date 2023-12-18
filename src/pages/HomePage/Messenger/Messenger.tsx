import { GetMessengerUsersService } from "../../../services/UsersService";
import { Loader } from "../../../components";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import useDebounceEffect from "../../../hooks/useDebounceEffect";
import { useFetchQuery } from "../../../hooks/useFetchQuery";
import { useErrorBoundary } from "react-error-boundary";
import "./Messenger.scss";

// react query refetch while typing
const Messenger = () => {
  console.log("Component Messenger");
  const { showBoundary } = useErrorBoundary();
  // const [inputSearch, setInputSearch] = useState("");

  const {
    data: users,
    isError,
    error,
    isLoading,
  } = useFetchQuery(GetMessengerUsersService, "messenger");

  if (isError) {
    showBoundary(error);
  }
  if (isLoading) {
    <Loader />;
  }
  console.log(users);
  // useDebounceEffect(() => {
  // getUserOnSearch();
  // }, [inputSearch]);

  // const searchInputHandler = (e: string) => {
  //   setInputSearch(e);
  // };

  const onMessengerUser = () => {
    //write some logic here
    alert("User is not available!");
  };

  return (
    <div
      className="container flex flex-col text-slate-200 p-2"
      data-bs-spy="scroll"
    >
      <div className=" pl-2 text-xl">
        <h3>Contacts</h3>
      </div>
      <div className="p-2 w-full">
        <input
          // onChange={(e) => searchInputHandler(e.target.value)}
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
                  <div
                    className="flex flex-row   "
                    // onClick={onMessengerUser}
                  >
                    <img
                      src={user?.image}
                      alt=""
                      className="max-w-[30px] mr-1"
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
