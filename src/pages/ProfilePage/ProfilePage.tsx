import UserDetails from "./UserDetails/UserDetails";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Feed from "../HomePage/Feed/Feed";

const ProfilePage = () => {
  console.log("Components ProfilePage");
  return (
    <div className="md:container-fluid flex flex-col gap-2 ">
      <div>
        <ProfileInfo />
      </div>
      <div className="flex flex-row w-full gap-2">
        <div>
          <UserDetails />
        </div>
        <div>
          <Feed feedType="profile-page" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
