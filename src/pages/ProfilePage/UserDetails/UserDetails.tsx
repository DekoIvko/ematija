import { useUserAuthContext } from "../../../context/UserAuthContext";
import { useAppSelector } from "../../../store/hooks";

const UserDetails = () => {
  const userDetails = useUserAuthContext();
  const appSettings = useAppSelector((state) => state.appSettings);

  return (
    <div
      className={`flex flex-col p-4 m-2 rounded ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-800"
          : "text-slate-800 bg-gray-200"
      }`}
    >
      {" "}
      <div className="flex">
        <div className="info-title flex">
          <h3 className="text-xl">User details</h3>
        </div>
      </div>
      <div className="info-data flex flex-col">
        <div className="info-details p-1 m-3 flex flex-row gap-2">
          <span>Gender:</span>
          <span>{userDetails?.user?.gender}</span>
        </div>
        <div className="info-details p-1 m-3 flex flex-row gap-2">
          <span>Address:</span>
          <span>{userDetails?.user?.contact?.address}</span>
        </div>
        <div className="info-details p-1 m-3 flex flex-row gap-2">
          <span>Email:</span>
          <span>{userDetails?.user?.email}</span>
        </div>
        <div className="info-details p-1 m-3 flex flex-row gap-2">
          <span>Mobile:</span>
          <span>{userDetails?.user?.contact?.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
