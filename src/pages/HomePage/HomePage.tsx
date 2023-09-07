import React, { useContext, useEffect, useState } from "react";
import GetPostsService from "../../services/GetPostsService";
import { StateContext } from "../../store/store";

import "./HomePage.scss";

const HomePage = () => {
  const { state, dispatch } = useContext(StateContext);
  const [allPosts, setAllPosts] = useState<any>();
  const getAllPosts = async () => {
    const getPosts: any = await GetPostsService();
    setAllPosts(getPosts?.posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div
      className="home-page d-flex flex-row"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <div style={{ color: "white" }} className="navigation d-flex">
        {"my name is " + state?.facebookUser?.name}
      </div>
      <div className="main d-flex flex-column">
        {allPosts
          ? allPosts.map((item: any, index: number) => {
              return (
                <div
                  key={item?.title + "_" + index}
                  className="posts d-flex flex-column"
                >
                  <div className="post-header d-flex flex-row gap-3">
                    <span>{item?.userId}</span>
                    <h4>{item?.title}</h4>
                  </div>
                  <div className="post-body d-flex">
                    <div className="post-body-comment-text text-left">
                      {item?.body}
                    </div>
                  </div>
                  <div className="post-tags d-flex flex-row gap-3">
                    {item?.tags.map((tag: string) => {
                      return <span key={tag}>{tag}</span>;
                    })}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default HomePage;
