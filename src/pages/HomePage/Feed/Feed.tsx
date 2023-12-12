import { Loader } from "../../../components";
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
import { useAppSelector } from "../../../store/hooks";
import { useErrorBoundary } from "react-error-boundary";

interface IProps {
  feedType: string;
}

const Feed = ({ feedType }: IProps) => {
  console.log("Components Feed");
  const user = useAppSelector((state: any) => state.user);
  const { showBoundary } = useErrorBoundary();

  const [posts, postsByUser, comments, users] = useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: GetPostsService,
        enabled: feedType === "home-page",
      },
      {
        queryKey: ["posts-user"],
        queryFn: () => GetUserPostsService(user.id),
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
    console.log(posts);
    if (posts?.data?.status === 200) {
      posts?.data?.data?.forEach((post: IPosts) => {
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
    } else {
      console.log("nema postovi!");
    }
  } else if (
    feedType === "profile-page" &&
    postsByUser?.isSuccess &&
    comments?.isSuccess &&
    users?.isSuccess
  ) {
    if (postsByUser?.data?.status === 200) {
      postsByUser?.data?.data.forEach((post: IPosts) => {
        const user = users?.data?.users.find(
          (user: IUserDetails) => 123456 === user.id
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
    } else {
    }
  }

  if (
    posts?.isError ||
    postsByUser?.isError ||
    comments?.isError ||
    users?.isError
  ) {
    showBoundary(
      posts.error || postsByUser?.error || comments?.error || users?.error
    );
  }

  if (posts.isFetching || postsByUser.isFetching) {
    return <Loader />;
  }

  return (
    <div className="home-feed">
      {(posts?.isSuccess || postsByUser?.isSuccess) &&
      (posts?.data?.data || postsByUser?.data?.data) ? (
        <>
          <Posts
            posts={feedType === "home-page" ? posts?.data : postsByUser?.data}
          />
        </>
      ) : (
        <p>No posts to display!</p>
      )}
    </div>
  );
};

export default Feed;
