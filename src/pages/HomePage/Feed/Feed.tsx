import React, { useContext } from "react";
import { Loader, StatusMessage } from "../../../components";
import { IStateContext, StateContext } from "../../../store/store";
import { useQueries } from "@tanstack/react-query";

import { IPosts } from "../../../interfaces/IPosts";
import { IComments } from "../../../interfaces/IComments";

import { GetAllCommentsService } from "../../../services/CommentsService";
import {
  GetPostsService,
  GetUserPostsService,
} from "../../../services/PostsService";
import { GetUsersService } from "../../../services/UsersService";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import Posts from "./Posts/Posts";
import "./Feed.scss";

interface IProps {
  feedType: string;
}

const Feed = ({ feedType }: IProps) => {
  console.log("Components Feed");
  const { state } = useContext<IStateContext>(StateContext);

  const [posts, comments, users, postsByUser] = useQueries({
    queries: [
      {
        queryKey: ["posts", 1],
        queryFn: GetPostsService,
        enabled: feedType === "home-page",
      },
      {
        queryKey: ["comments", 2],
        queryFn: GetAllCommentsService,
      },
      { queryKey: ["users", 3], queryFn: GetUsersService, staleTime: Infinity },
      {
        queryKey: ["posts-user", 4],
        queryFn: () => GetUserPostsService(state?.loggedUser?.id.toString()),
        enabled: feedType === "profile-page",
      },
    ],
  });

  if (
    feedType === "home-page" &&
    posts?.isSuccess &&
    comments?.isSuccess &&
    users?.isSuccess
  ) {
    console.log("feed type POSTS");
    posts?.data?.data.posts.forEach((post: IPosts) => {
      const user = users?.data?.data?.users.find(
        (user: IUserDetails) => post?.userId === user.id
      );
      const tempComments = comments?.data?.data?.comments.filter(
        (comment: IComments) => post.id === comment.postId
      );

      post.comments = tempComments || {};
      post.user = user || {};
      post.showCommentSection = false;
      return post;
    });
  } else if (
    feedType === "profile-page" &&
    postsByUser?.isSuccess &&
    comments?.isSuccess &&
    users?.isSuccess
  ) {
    console.log("feed type USERS-POSTS");
    postsByUser?.data?.data.posts.forEach((post: IPosts) => {
      const user = users?.data?.data?.users.find(
        (user: IUserDetails) => post?.userId === user.id
      );
      const tempComments = comments?.data?.data?.comments.filter(
        (comment: IComments) => post.id === comment.postId
      );

      post.comments = tempComments || {};
      post.user = user || {};
      post.showCommentSection = false;
      return post;
    });
    console.log(postsByUser);
  }

  return (
    <div className="home-feed">
      {(posts.isLoading || postsByUser.isLoading) &&
        !(posts.isError || !postsByUser.isError) && <Loader />}
      {!(posts.isLoading || !postsByUser.isLoading) &&
        (posts.isError || postsByUser.isError) &&
        posts.error instanceof Error && (
          <StatusMessage status="error" message={posts.error.message} />
        )}
      {(!posts.isLoading || !postsByUser.isLoading) &&
      (!posts.isError || !postsByUser.isError) &&
      (posts.isSuccess || postsByUser.isSuccess) ? (
        <>
          <Posts
            posts={
              feedType === "home-page"
                ? posts?.data?.data?.posts
                : postsByUser?.data?.data?.posts
            }
          />
        </>
      ) : null}
    </div>
  );
};

export default Feed;
