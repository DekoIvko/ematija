import React, { useContext, useEffect, useState } from "react";
import GetPostsService from "../../services/GetPostsService";
import { StateContext } from "../../store/store";
import HomeFeed from "./HomeFeed/HomeFeed";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";
import GetUsersService from "../../services/GetUsers";

import "./HomePage.scss";

const HomePage = () => {
  const { state } = useContext(StateContext);
  const [allPosts, setAllPosts] = useState<any>();

  const getAllPosts = async () => {
    const getPosts: any = await GetPostsService();
    const allUsers: any = await GetUsersService();

    getPosts?.posts?.forEach((element: any) => {
      const user = allUsers?.users?.find(
        (user: any) => element?.userId === user.id
      );
      if (user) {
        element.user = user;
      }
      return element;
    });
    // console.log(getPosts?.posts);
    setAllPosts(getPosts?.posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div
      className="home-page d-flex flex-row gap-2"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <div className="navigation d-flex flex-column align-self-start bd-highlight flex-grow-1">
        <NavigationMenu state={state} />
      </div>
      <div className="main d-flex flex-column align-self-center">
        <HomeFeed allPosts={allPosts} />
      </div>
    </div>
  );
};

export default HomePage;
