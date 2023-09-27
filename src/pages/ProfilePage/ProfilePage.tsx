import { useCallback, useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IStateContext, StateContext } from "../../store/store";
import { GetSingleUserService } from "../../services/UsersService";
import { IUserDetails } from "../../interfaces/IUserDetails";
import UserDetails from "./UserDetails/UserDetails";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Feed from "../HomePage/Feed/Feed";
import { Loader, StatusMessage } from "../../components/index";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const { state } = useContext<IStateContext>(StateContext);
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = useCallback(
    async (userId: string) => {
      setLoading(true);
      try {
        const { status, data }: AxiosResponse = await GetSingleUserService(
          userId
        );

        if (status === 200) {
          setUserDetails(data);
        } else {
          setError(data?.message);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [userDetails]
  );

  useEffect(() => {
    getUserDetails(state?.loggedUser?.id.toString());
  }, [state.loggedUser]);

  return (
    <div
      className="profile-page container-fluid d-flex flex-column"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      {error && !loading && (
        <StatusMessage status="error" message={error.message} />
      )}
      {!error && loading && <Loader />}
      {!error && !loading && (
        <>
          <div className="profile-info d-flex flex-column w-100">
            {userDetails && <ProfileInfo userDetails={userDetails} />}
          </div>
          <div className="personal-info d-flex flex-row w-100 p-4">
            <div className="personal-info-body d-flex flex-column p-3">
              {userDetails && <UserDetails userDetails={userDetails} />}
            </div>
            <div className="profile-feed d-flex flex-column">
              <Feed feedType="profile-page" userData={userDetails} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
