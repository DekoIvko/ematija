import React, { useEffect } from "react";
import { IUserDetails } from "../../../interfaces/IUserDetails";

interface IProps {
    userDetails: IUserDetails
}

const UserDetails = ({userDetails}: IProps) => {
    useEffect(() => {
console.log(userDetails)
    }, [userDetails])
    
  return (
    <div>
      {" "}
      <div className="d-flex">
        <div className="info-title d-flex">
          <h3>Intro</h3>
        </div>
      </div>
      <div className="info-data d-flex flex-column">
        <div className="info-details p-2 m-3 d-flex flex-row gap-2">
          <span>Gender:</span>
          <span>{userDetails?.gender}</span>
        </div>
        <div className="info-details p-2 m-3 d-flex flex-row gap-2">
          <span>Address:</span>
          <span>{userDetails?.address.address}</span>
        </div>
        <div className="info-details p-2 m-3 d-flex flex-row gap-2">
          <span>Email:</span>
          <span>{userDetails?.email}</span>
        </div>
        <div className="info-details p-2 m-3 d-flex flex-row gap-2">
          <span>Mobile:</span>
          <span>{userDetails?.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
