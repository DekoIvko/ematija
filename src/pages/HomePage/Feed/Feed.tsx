import { useContext } from "react";
import { Loader, Pagination, StatusMessage } from "../../../components";
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

  const [posts, postsByUser, comments, users] = useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: GetPostsService,
        enabled: feedType === "home-page",
      },
      {
        queryKey: ["posts-user"],
        queryFn: () => GetUserPostsService(state?.loggedUser?.id.toString()),
        enabled: feedType === "profile-page",
      },
      {
        queryKey: ["comments"],
        queryFn: GetAllCommentsService,
      },
      {
        queryKey: ["users"],
        queryFn: GetUsersService,
      },
    ],
  });

  if (
    feedType === "home-page" &&
    posts?.isSuccess &&
    comments?.isSuccess &&
    users?.isSuccess
  ) {
    posts?.data?.posts.forEach((post: IPosts) => {
      const user = users?.data?.users.find(
        (user: IUserDetails) => post?.userId === user.id
      );
      const tempComments = comments?.data?.comments.filter(
        (comment: IComments) => post.id === comment.postId
      );

      post.comments = post.comments ? post.comments : tempComments;
      post.user = user || {};
      post.showCommentSection = post.showCommentSection
        ? post.showCommentSection
        : false;
      return post;
    });
  } else if (
    feedType === "profile-page" &&
    postsByUser?.isSuccess &&
    comments?.isSuccess &&
    users?.isSuccess
  ) {
    postsByUser?.data?.posts.forEach((post: IPosts) => {
      const user = users?.data?.users.find(
        (user: IUserDetails) => state?.loggedUser?.id === user.id
      );
      const tempComments = comments?.data?.comments.filter(
        (comment: IComments) => post.id === comment.postId
      );

      post.comments = tempComments || {};
      post.user = user || {};
      post.showCommentSection = post.showCommentSection
        ? post.showCommentSection
        : false;
      return post;
    });
    console.log(postsByUser);
  }

  return (
    <div className="home-feed">
      {(posts.isFetching || postsByUser.isFetching) && <Loader />}
      {(!posts?.isFetching || !postsByUser?.isFetching) &&
        (posts?.isError || postsByUser?.isError) &&
        (posts?.error instanceof Error ||
          postsByUser?.error instanceof Error) && (
          <StatusMessage
            from="feed"
            status="error"
            message={"ova ovde treba da se opravi mi vodi inat so nedeli"}
          />
        )}
      {(posts?.isSuccess || postsByUser?.isSuccess) &&
      (posts?.data || postsByUser?.data) ? (
        <>
          <Posts
            state={state}
            posts={
              feedType === "home-page"
                ? posts?.data?.posts
                : postsByUser?.data?.posts
            }
          />
        </>
      ) : null}
    </div>
  );
};

export default Feed;
