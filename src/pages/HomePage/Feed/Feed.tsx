import { Loader } from "../../../components";
import { useQueries } from "@tanstack/react-query";

import Posts from "./Posts/Posts";
import { IPosts } from "../../../interfaces/IPosts";
import { IComments } from "../../../interfaces/IComments";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import { useErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";

import { GetAllCommentsService } from "../../../services/CommentsService";
import {
  GetPostsService,
  GetUserPostsService,
} from "../../../services/PostsService";
import { GetUsersService } from "../../../services/UsersService";
import { useUserAuthContext } from "../../../context/UserAuthContext";
import AddPost from "./AddPost/AddPost";
import FeedsSkeleton from "../../../skeletons/FeedsSkeleton";

interface IProps {
  feedType: string;
}

const Feed = ({ feedType }: IProps) => {
  // console.log("Components Feed");
  const { showBoundary } = useErrorBoundary();
  const authUser = useUserAuthContext();

  const setPostsWithCommentsAndUsers = (post: IPosts) => {
    const user = users?.data?.data.find(
      (user: IUserDetails) => post?.userId === user.id
    );
    const tempComments = comments?.data?.data.filter(
      (comment: IComments) => post.id === comment.postId
    );
    post.comments = post.comments ? post.comments : tempComments;
    post.user = user || {};
    post.showCommentSection = post.showCommentSection
      ? post.showCommentSection
      : false;
    return post;
  };

  const [posts, postsByUser, comments, users] = useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: GetPostsService,
        enabled: feedType === "home-page",
      },
      {
        queryKey: ["posts-user"],
        queryFn: () => GetUserPostsService(authUser?.user?.id.toString()),
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
    try {
      // console.log(posts.data);
      if (posts?.data?.status === 200) {
        posts?.data?.data?.forEach((post: IPosts) => {
          setPostsWithCommentsAndUsers(post);
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  } else if (
    feedType === "profile-page" &&
    postsByUser?.isSuccess &&
    comments?.isSuccess &&
    users?.isSuccess
  ) {
    try {
      // console.log(postsByUser);
      if (postsByUser?.data?.status === 200) {
        postsByUser?.data?.data.forEach((post: IPosts) => {
          setPostsWithCommentsAndUsers(post);
        });
      }
    } catch (error) {
      toast.error(`${error}`);
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

  return (
    <>
      {posts?.isFetching && <FeedsSkeleton />}
      {posts?.isSuccess || postsByUser?.isSuccess ? (
        <>
          <AddPost />
          <Posts
            posts={feedType === "home-page" ? posts?.data : postsByUser?.data}
          />
        </>
      ) : (
        <p>No posts to display!</p>
      )}
    </>
  );
};

export default Feed;
