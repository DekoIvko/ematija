import { useUserAuthContext } from "../../context/UserAuthContext";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { INotifications } from "../../interfaces/INotifications";
import { GetAllNotificationsService } from "../../services/NotificationsService";
import { useAppSelector } from "../../store/hooks";
import Loader from "../Loader/Loader";

const Notifications = () => {
  const user = useUserAuthContext();
  const appSettings = useAppSelector((state) => state.appSettings);

  const { data, isError, error, isLoading, isSuccess } = useFetchQuery(
    () => GetAllNotificationsService(user.user.id.toString()),
    "notifications"
  );

  if (isLoading) {
    <Loader />;
  }
  if (isError) {
    console.log(error);
  }

  return (
    <div
      className={`absolute right-6 top-16 p-2 shadow drop-shadow-md flex rounded ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-700"
          : "text-slate-800 bg-gray-300"
      }`}
    >
      <div className="flex flex-col">
        {isSuccess &&
          data?.data.map((notify: INotifications) => {
            return (
              <div
                key={notify?.id}
                className={`flex flex-col p-1 my-1 shadow text-sm rounded cursor-pointer ${
                  appSettings.appTheme === "dark"
                    ? "text-slate-200 bg-gray-500"
                    : "text-slate-800 bg-gray-400"
                }`}
              >
                <span>{notify?.title}</span>
                <span>
                  {notify.type}: {notify?.body}
                </span>
                <span>
                  time: {new Date(notify?.timestamp).toISOString().slice(0, 10)}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notifications;
