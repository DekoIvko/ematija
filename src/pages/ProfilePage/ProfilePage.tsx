import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext } from "../../store/store";
import { GetSingleUserService } from "../../services/GetUsersService";
import { IUserDetails } from "../../interfaces/IUserDetails";
import { GetUserPostsService } from "../../services/GetPostsService";
import { IPosts } from "../../interfaces/IPosts";
import UserDetails from "./UserDetails/UserDetails";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import HomeFeed from "../HomePage/HomeFeed/HomeFeed";
import { Loader, StatusMessage } from "../../components/index";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const { state, dispatch } = useContext(StateContext);
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [userPosts, setUserPosts] = useState<IPosts[]>();

  const getUserDetails = useCallback(async (userId: string) => {
    dispatch({ type: "setLoader", payload: true });
    try {
      return await GetSingleUserService(userId);
    } catch (error: any) {
      dispatch({ type: "setError", payload: true });
      dispatch({ type: "setErrorMessage", payload: error.message });
    }
  }, []);

  const getUserPosts = useCallback(async (userId: string) => {
    dispatch({ type: "setLoader", payload: true });
    try {
      return await GetUserPostsService(userId);
    } catch (error: any) {
      dispatch({ type: "setError", payload: true });
      dispatch({ type: "setErrorMessage", payload: error.message });
    }
  }, []);

  useEffect(() => {
    async function asyncFunction() {
      let userD: any;
      await getUserDetails(state?.logedUser?.id)
        .then((res) => {
          userD = res;
          setUserDetails(res);
          return res;
        })
        .then((ress: any) => {
          return getUserPosts(ress.id);
        })
        .then((resss) => {
          resss?.forEach((element: any) => {
            element.user = userD;
          });
          setUserPosts((prevObj) => (prevObj = resss));
        })
        .finally(() => {
          dispatch({ type: "setLoader", payload: false });
        });
    }
    asyncFunction();
  }, [state.logedUser]);

  return (
    <div
      className="profile-page container-fluid d-flex flex-column"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      {state?.error && !state.loader && (
        <StatusMessage status="error" message={state?.errorMessage} />
      )}
      {!state?.error && state.loader && <Loader />}
      {!state?.error && !state.loader && (
        <>
          <div className="profile-info d-flex flex-column w-100">
            {userDetails && <ProfileInfo userDetails={userDetails} />}
          </div>
          <div className="personal-info d-flex flex-row w-100 p-4">
            <div className="personal-info-body d-flex flex-column p-3">
              {userDetails && <UserDetails userDetails={userDetails} />}
            </div>
            <div className="profile-feed d-flex flex-column">
              {userPosts && <HomeFeed allPosts={userPosts} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
