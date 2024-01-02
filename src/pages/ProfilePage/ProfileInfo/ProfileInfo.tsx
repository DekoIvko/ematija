import { useUserAuthContext } from "../../../context/UserAuthContext";
import { useAppSelector } from "../../../store/hooks";

const ProfileInfo = () => {
  const userDetails = useUserAuthContext();
  const appSettings = useAppSelector((state) => state.appSettings);

  return (
    <div
      className={`flex flex-row align-center w-full p-5 m-2 rounded  ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-800"
          : "text-slate-800 bg-gray-200"
      }`}
    >
      <div className="flex flex-row justify-between items-end w-full">
        <div className="flex flex-row items-end w-full">
          <img
            src={userDetails?.user?.image}
            alt="Profile"
            className="w-44 rounded"
          />
          <div className="flex ms-3 text-2xl">
            <h2>{`${userDetails?.user?.firstName} ${userDetails?.user?.lastName}`}</h2>
          </div>
        </div>
        <div className="flex align-end">
          <button className="btn btn-secondary" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
