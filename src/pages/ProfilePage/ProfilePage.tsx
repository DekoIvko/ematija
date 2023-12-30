import UserDetails from "./UserDetails/UserDetails";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Feed from "../HomePage/Feed/Feed";

import "./ProfilePage.scss";

const ProfilePage = () => {
  console.log("Components ProfilePage");
  return (
    <div className="profile-page container-fluid flex flex-col">
      <>
        <div className="profile-info flex flex-col w-100">
          <ProfileInfo />
        </div>
        <div className="personal-info flex flex-row w-100 p-4">
          <div className="personal-info-body flex flex-col p-3">
            <UserDetails />
          </div>
          <div className="profile-feed flex flex-col">
            <Feed feedType="profile-page" />
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfilePage;
