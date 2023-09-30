import { useCallback, useEffect, useRef, useState } from "react";

import { AxiosResponse } from "axios";
import {
  GetUsersSearchService,
  GetUsersService,
} from "../../../services/UsersService";
import { Loader, StatusMessage } from "../../../components";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import "./Messenger.scss";

const Messenger = () => {
  const [users, setUsers] = useState<IUserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const inputSearch = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    getAllUsers();
  }, []);

  const getUserOnSearch = async () => {
    setLoading(true);
    try {
      const { data, status }: AxiosResponse = await GetUsersSearchService(
        inputSearch.current?.value.toString()!
      );

      if (status === 200) {
        if (inputSearch.current?.value) {
          setUsers(data?.users);
        } else {
          getAllUsers();
        }
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
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
        <input ref={inputSearch} onChange={getUserOnSearch} type="text" />
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
