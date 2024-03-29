import React, { useState } from "react";
import { IPosts } from "../../../../interfaces/IPosts";
import Comments from "../Comments/Comments";
import { IoMdClose } from "react-icons/io";
import { Loader, Pagination, Reactions } from "../../../../components";
import { useAppSelector } from "../../../../store/hooks";
import AddComments from "../AddComments/AddComments";
import { AddCommentService } from "../../../../services/CommentsService";
import { IParamComment } from "../../../../interfaces/IParamComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserAuthContext } from "../../../../context/UserAuthContext";

import {
  AddReactionsService,
  RemovePostService,
} from "../../../../services/PostsService";
import toast from "react-hot-toast";
import { AddNotificationService } from "../../../../services/NotificationsService";
import { INotifications } from "../../../../interfaces/INotifications";
import { NotificationTypes } from "../../../../enums/ENotifications";
import socket from "../../../../socket";

const Posts = ({ posts = [] }: any) => {
  // console.log("Components Posts ");
  const user = useUserAuthContext();
  const appSettings = useAppSelector((state) => state.appSettings);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const removePost = useMutation({
    mutationFn: RemovePostService,
    onSuccess: async (result, variables) => {
      await queryClient.refetchQueries(["posts"]);
      toast.success("Success remove post!");
    },
  });

  const addReaction = useMutation({
    mutationFn: AddReactionsService,
    onSuccess: async (result, variables) => {},
  });

  const addNotification = useMutation({
    mutationFn: AddNotificationService,
    onSuccess: (result, variables) => {},
  });

  const addComments = useMutation({
    mutationFn: AddCommentService,
    onSuccess: (result, variables) => {
      const updatedPosts = posts?.data?.map((item: any) => {
        if (item.id === variables.postId) {
          return {
            ...item,
            comments: [...item.comments, result],
            showCommentSection: !item.showCommentSection,
          };
        }
        return item;
      });

      queryClient.setQueryData(["posts"], { data: [...updatedPosts] });
      toast.success("Success add comment!");
    },
  });

  if (addComments?.isError) {
    toast.error(addComments?.error!.toString() || "");
  }
  if (removePost?.isError) {
    toast.error(removePost?.error!.toString() || "");
  }
  if (addReaction?.isError) {
    toast.error(addReaction?.error!.toString() || "");
  }
  if (addNotification?.isError) {
    toast.error(addNotification?.error!.toString() || "");
  }

  const onShowCommentSection = (
    e: React.MouseEvent<HTMLButtonElement>,
    post: IPosts
  ) => {
    e.preventDefault();
    const showCommentSect = posts?.data?.map((item: any) => {
      if (item.id === post.id) {
        return { ...item, showCommentSection: !item.showCommentSection };
      }
      return item;
    });
    queryClient.setQueryData(["posts"], { data: [...showCommentSect] });
  };

  const onAddComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    post: IPosts,
    newComment: string
  ) => {
    try {
      e.preventDefault();
      const paramComment: IParamComment = {
        id: 0,
        body: newComment,
        postId: post?.id,
        user: {
          id: user?.user.id,
          username: user?.user.username,
        },
      };

      const AddComment = await addComments.mutateAsync(paramComment);
      if (AddComment) {
        const paramNotification: INotifications = {
          id: 0,
          type: NotificationTypes.comment,
          timestamp: new Date().toISOString(),
          title: "New comment at your post",
          body: newComment,
          fromUserId: user?.user.id,
          toUserId: post.userId,
          fullName: user.user.firstName + " " + user.user.lastName,
        };
        socket.emit("notifications", paramNotification);
        await addNotification.mutateAsync(paramNotification);
        // await queryClient.refetchQueries(["notifications"]); // need to check this
      }
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  const onRemovePost = async (post: IPosts) => {
    if (window.confirm("Are you sure you want to delete this post?"))
      await removePost.mutateAsync(post.id.toString());
  };

  const onPostReactions = async (post: IPosts, reaction: string) => {
    const params = {
      postId: post.id,
      reaction: reaction,
      userId: user.user.id,
    };
    const addedReaction = await addReaction.mutateAsync(params);
    if (
      addedReaction?.status === 200 &&
      addedReaction?.data.data.added === "added"
    ) {
      const paramNotification: INotifications = {
        id: 0,
        type: NotificationTypes.reaction,
        timestamp: new Date().toISOString(),
        title: "New reaction at your post",
        body: reaction,
        fromUserId: user.user.id,
        toUserId: post.userId,
        fullName: user.user.firstName + " " + user.user.lastName,
      };
      socket.emit("notifications", paramNotification);
      await addNotification.mutateAsync(paramNotification);
      // await queryClient.refetchQueries(["notifications"]); // need to check this
    }
    await queryClient.refetchQueries(["posts"]);
    // queryClient.setQueryData(["posts"], (posts: any) => { this is try to not refetch
    //   posts.data?.map((postMap: any) => {
    //     if (postMap.id === post.id) {
    //       console.log(postMap);
    //     }
    //   });
    // });
  };

  return (
    <>
      {posts ? (
        posts?.data
          ?.slice(currentPage - 1, currentPage + 10)
          ?.map((post: IPosts) => {
            return (
              <div
                key={post.id}
                className={`flex flex-col rounded p-2 my-2 ${
                  appSettings.appTheme === "dark"
                    ? "text-slate-200 bg-gray-800"
                    : "text-slate-800 bg-gray-200"
                }`}
              >
                <div className="flex flex-col gap-3 relative">
                  <div className="flex gap-1 items-end align-items-end">
                    <img
                      src={post.user?.image}
                      alt="Profile"
                      className="max-w-[30px] rounded-xl"
                    />
                    <span>{`${post.user?.firstName} ${post.user?.lastName}`}</span>
                  </div>
                  {user.user.id === post.userId && (
                    <div
                      className="absolute top-0 right-1 rounded-full p-1 cursor-pointer"
                      onClick={() => onRemovePost(post)}
                    >
                      <IoMdClose size={20} />
                    </div>
                  )}
                </div>
                <div className="py-4 px-2">
                  <div>{post.body}</div>
                </div>
                <div className="w-full bg-gray-700 h-[2px]"></div>
                <div className="flex gap-4 p-1 w-full m-2">
                  <Reactions post={post} onPostReactions={onPostReactions} />
                </div>
                <div className="w-full bg-gray-700 h-[2px]"></div>
                <div className="flex flex-row gap-3  p-1">
                  {post.tags.map((tag: string) => {
                    return <span key={tag}>{`#${tag}`}</span>;
                  })}
                </div>
                <div className="w-full bg-gray-700 h-[2px]"></div>
                <div className="flex flex-col max-h-[160px] mt-2 p-2 overflow-y-auto overflow-x-hidden shadow-inner shadow-gray-600/40">
                  <Comments comments={post.comments} />
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full justify-center">
                    <button
                      type="button"
                      className="p-1 text-decoration-none text-slate-400"
                      onClick={(e) => onShowCommentSection(e, post)}
                    >
                      Add comment
                    </button>
                  </div>
                  {post.showCommentSection && (
                    <>
                      {addComments.isLoading && <Loader />}
                      <AddComments item={post} onAddComment={onAddComment} />
                    </>
                  )}
                </div>
              </div>
            );
          })
      ) : (
        <></>
      )}
      {posts?.data && (
        <Pagination
          currentPage={currentPage}
          total={posts?.data?.length || 1}
          limit={10}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default Posts;
