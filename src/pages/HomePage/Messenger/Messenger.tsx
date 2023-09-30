import { useCallback, useState } from "react";

import { AxiosResponse } from "axios";
import {
  GetUsersSearchService,
  GetUsersService,
} from "../../../services/UsersService";
import { Loader, StatusMessage } from "../../../components";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import useDebounceEffect from "../../../hooks/useDebounceEffect";
import "./Messenger.scss";

const Messenger = () => {
  const [users, setUsers] = useState<IUserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [inputSearch, setInputSearch] = useState("");

  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, status }: AxiosResponse = await GetUsersService();

      if (status === 200) {
        setUsers(data?.users);
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [users]);

  const getUserOnSearch = async () => {
    setLoading(true);
    try {
      if (inputSearch.length > 0) {
        const { data, status }: AxiosResponse = await GetUsersSearchService(
          inputSearch
        );
        if (status === 200) {
          setUsers(data?.users);
        } else {
          setError(data.message);
        }
      } else {
        getAllUsers();
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useDebounceEffect(() => {
    getUserOnSearch();
  }, [inputSearch]);

  const searchInputHandler = (e: string) => {
    setInputSearch(e);
  };

  const onMessengerUser = () => {
    //write some logic here
    alert("User is not available!");
  };

  return (
    <div className="messenger d-flex flex-column " data-bs-spy="scroll">
      <div className="messenger-title">
        <h3>Contacts</h3>
      </div>
      <div className="messenger-user-search d-flex flex-column p-2">
        <input
          // ref={test}
          onChange={(e) => searchInputHandler(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="messenger-body d-flex flex-column">
        {loading && !error && <Loader />}
        {!loading && error && (
          <StatusMessage status="error" message={error?.message} />
        )}
        {!loading && !error && users && (
          <ul className="messenger-list d-flex list-group">
            {users
              ? users?.map((user: IUserDetails, index: number) => {
                  return (
                    <li
                      key={user.email + index}
                      className="messenger-user list-group-item list-group-item-action list-group-item-dark bg-transparent border-0 p-1 m-1"
                    >
                      <div
                        className="d-flex flex-row messenger-user-div"
                        onClick={onMessengerUser}
                      >
                        <img
                          src={user?.image}
                          alt="User profile"
                          style={{
                            maxWidth: "30px",
                            maxHeight: "30px",
                            marginRight: "5px",
                          }}
                          className="bg-secondary rounded-circle"
                        />
                        <div className="user-name">{`${user?.firstName} ${user.lastName}`}</div>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Messenger;
