import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { IStateContext, StateContext } from "../../store/store";
import { GetSingleUserService } from "../../services/UsersService";
// import { IUserDetails } from "../../interfaces/IUserDetails";
import UserDetails from "./UserDetails/UserDetails";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Feed from "../HomePage/Feed/Feed";
import { Loader, StatusMessage } from "../../components/index";

import "./ProfilePage.scss";

const ProfilePage = () => {
  console.log("Components ProfilePage");
  const { state } = useContext<IStateContext>(StateContext);

  const {
    data: userDetails,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-details"],
    queryFn: () => GetSingleUserService(state?.loggedUser?.id.toString()),
    select(data) {
      return data.data;
    },
  });

  return (
    <div
      className="profile-page container-fluid d-flex flex-column"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      {isError && error instanceof Error && !isLoading && (
        <StatusMessage status="error" message={error.message} />
      )}
      {!isError && isLoading && <Loader />}
      {!isError && !isLoading && (
        <>
          <div className="profile-info d-flex flex-column w-100">
            {isSuccess && <ProfileInfo userDetails={userDetails} />}
          </div>
          <div className="personal-info d-flex flex-row w-100 p-4">
            <div className="personal-info-body d-flex flex-column p-3">
              {isSuccess && <UserDetails userDetails={userDetails} />}
            </div>
            <div className="profile-feed d-flex flex-column">
              {isSuccess && <Feed feedType="profile-page" />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
