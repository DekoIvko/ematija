import UserDetails from "./UserDetails/UserDetails";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Feed from "../HomePage/Feed/Feed";
import { useAppSelector } from "../../store/hooks";
// import { GetSingleUserService } from "../../services/UsersService";

import "./ProfilePage.scss";

const ProfilePage = () => {
  console.log("Components ProfilePage");
  const user = useAppSelector((state: any) => state.user);

  return (
    <div className="profile-page container-fluid flex flex-col">
      {user && (
        <>
          <div className="profile-info flex flex-col w-100">
            <ProfileInfo userDetails={user} />
          </div>
          <div className="personal-info flex flex-row w-100 p-4">
            <div className="personal-info-body flex flex-col p-3">
              <UserDetails userDetails={user} />
            </div>
            <div className="profile-feed flex flex-col">
              <Feed feedType="profile-page" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
