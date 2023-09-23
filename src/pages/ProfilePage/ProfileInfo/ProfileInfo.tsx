import { IUserDetails } from "../../../interfaces/IUserDetails";

interface IProps {
  userDetails: IUserDetails;
}

const ProfileInfo = ({ userDetails }: IProps) => {
  return (
    <div>
      {" "}
      <div className="profile-name-edit d-flex flex-row align-self-center w-100 p-5 m-1">
        <div className="profile-picture-name d-flex flex-row justify-content-between w-100">
          <div className="d-flex flex-row align-self-center w-70">
            <img src={userDetails?.image} alt="Profile" />
            <div className="d-flex align-self-end ms-3">
              <h2>{`${userDetails?.firstName} ${userDetails?.lastName}`}</h2>
            </div>
          </div>
          <div className="d-flex align-self-end">
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
              <span className="ms-2">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
