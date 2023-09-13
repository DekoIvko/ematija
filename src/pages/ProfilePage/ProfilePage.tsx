import React, { useContext } from "react";
import { StateContext } from "../../store/store";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const { state } = useContext(StateContext);
  return (
    <div
      className="profile-page d-flex flex-column"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <div className="profile-info d-flex flex-column w-100">
        <div className="profile-name-edit d-flex flex-row align-self-center w-100 p-5 m-1">
          <div className="profile-picture-name d-flex flex-row justify-content-between w-100">
            <div className="d-flex flex-row align-self-center w-70">
              <img
                src="https://scontent.fskp4-1.fna.fbcdn.net/v/t39.30808-1/347266956_6232485906867019_5629586487652827515_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=fe8171&_nc_ohc=EubKs2joNyIAX-3RRtM&_nc_ht=scontent.fskp4-1.fna&oh=00_AfAKgVMzVBRfrfPLNJu8vFgtFqn7jBK-Yf-2Z8Km05ZX5Q&oe=650572D5"
                alt="Facebook profile"
              />
              <div className="d-flex align-self-end ms-3">
                <h2>{state?.facebookUser?.name}</h2>
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
      <div className="personal-info d-flex flex-row w-100 p-4">
        <div className="personal-info-body d-flex flex-column p-3">
          <div className="d-flex">
            <div className="info-title d-flex">
              <h3>Intro</h3>
            </div>
          </div>
          <div className="info-data d-flex flex-column">
            <div className="info-details p-2 m-3 d-flex flex-row gap-2">
              <span>Name:</span>
              <span>Dejan Ivkovski</span>
            </div>
            <div className="info-details p-2 m-3 d-flex flex-row gap-2">
              <span>Live:</span>
              <span>Skopje, Macedonia</span>
            </div>
            <div className="info-details p-2 m-3 d-flex flex-row gap-2">
              <span>Email:</span>
              <span>ivkovski89@hotmail.com</span>
            </div>
            <div className="info-details p-2 m-3 d-flex flex-row gap-2">
              <span>Mobile:</span>
              <span>070 389 483</span>
            </div>
          </div>
        </div>
        <div className="profile-feed d-flex flex-column"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
