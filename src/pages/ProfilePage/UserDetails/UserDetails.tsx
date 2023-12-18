import { IUserDetails } from "../../../interfaces/IUserDetails";

interface IProps {
  userDetails: IUserDetails;
}

const UserDetails = ({ userDetails }: IProps) => {
  return (
    <div>
      {" "}
      <div className="flex text-slate-200">
        <div className="info-title flex">
          <h3>Intro</h3>
        </div>
      </div>
      <div className="info-data flex flex-col">
        <div className="info-details p-2 m-3 flex flex-row gap-2">
          <span>Gender:</span>
          <span>{userDetails?.gender}</span>
        </div>
        <div className="info-details p-2 m-3 flex flex-row gap-2">
          <span>Address:</span>
          <span>{userDetails?.contact?.address}</span>
        </div>
        <div className="info-details p-2 m-3 flex flex-row gap-2">
          <span>Email:</span>
          <span>{userDetails?.email}</span>
        </div>
        <div className="info-details p-2 m-3 flex flex-row gap-2">
          <span>Mobile:</span>
          <span>{userDetails?.contact?.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
