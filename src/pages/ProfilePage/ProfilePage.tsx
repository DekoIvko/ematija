import { useQuery } from "@tanstack/react-query";
import { GetSingleUserService } from "../../services/UsersService";
import UserDetails from "./UserDetails/UserDetails";
import { useSelector } from "react-redux";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Feed from "../HomePage/Feed/Feed";
import { Loader, StatusMessage } from "../../components/index";

import "./ProfilePage.scss";
import { useAppSelector } from "../../store/hooks";

const ProfilePage = () => {
  console.log("Components ProfilePage");
  const user = useAppSelector((state: any) => state.user);
  // const { state } = useContext<IStateContext>(StateContext);

  const {
    data: userDetails,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-details"],
    queryFn: () => GetSingleUserService(user?.loggedUser?.id.toString()),
  });

  return (
    <div
      className="profile-page container-fluid flex flex-col"
      // style={{
      //   background: user?.appTheme === "dark" ? "#18191a" : "whitesmoke",
      //   color: user?.appTheme === "dark" ? "whitesmoke" : "#242526",
      // }}
    >
      {isError && error instanceof Error && !isLoading && (
        <StatusMessage
          from="profile-page"
          status="error"
          message={error.message}
        />
      )}
      {!isError && isLoading && <Loader />}
      {!isError && !isLoading && (
        <>
          <div className="profile-info flex flex-col w-100">
            {isSuccess && <ProfileInfo userDetails={userDetails} />}
          </div>
          <div className="personal-info flex flex-row w-100 p-4">
            <div className="personal-info-body flex flex-col p-3">
              {isSuccess && <UserDetails userDetails={userDetails} />}
            </div>
            <div className="profile-feed flex flex-col">
              {isSuccess && <Feed feedType="profile-page" />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
