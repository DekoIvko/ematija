import React, { useState } from "react";
import { IPosts } from "../../../../interfaces/IPosts";
import Comments from "../Comments/Comments";
import { Loader, Pagination, StatusMessage } from "../../../../components";
import AddComments from "../AddComments/AddComments";
import { AddCommentService } from "../../../../services/CommentsService";
import { IParamComment } from "../../../../interfaces/IParamComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserAuthContext } from "../../../../context/UserAuthContext";
import toast from "react-hot-toast";

// implement add comment with react query with useMutation and setQueryData
const Posts = ({ posts = [] }: any) => {
  // console.log("Components Posts ");
  const user = useUserAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

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

      queryClient.setQueryData(["posts"], { posts: [...updatedPosts] });
      toast.success("Success add comment!");
    },
  });

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
    queryClient.setQueryData(["posts"], { posts: [...showCommentSect] });
  };

  const onAddComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    post: IPosts,
    newComment: string
  ) => {
    try {
      e.preventDefault();
      const paramComment: IParamComment = {
        body: newComment,
        postId: post.id,
        userId: user?.user.id,
      };

      await addComments.mutateAsync(paramComment);
    } catch (error: any) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  return (
    <>
      {posts ? (
        posts?.data
          ?.slice(currentPage - 1, currentPage + 10)
          ?.map((item: IPosts, index: number) => {
            return (
              <div
                key={item?.id + "_" + index}
                className="flex flex-col bg-gray-800 rounded p-2 my-2 text-slate-200"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-1 items-end align-items-end">
                    <img
                      src={item?.user?.image}
                      alt="Profile"
                      className="max-w-[30px]"
                    />
                    <span>{`${item?.user?.firstName} ${item?.user?.lastName}`}</span>
                  </div>
                </div>
                <div className="py-4 px-2">
                  <div>{item?.body}</div>
                </div>
                <div className="w-full bg-gray-700 h-[2px]"></div>
                <div className="flex flex-row gap-3  p-1">
                  {item?.tags.map((tag: string, index: number) => {
                    return <span key={tag + "_" + index}>{`#${tag}`}</span>;
                  })}
                </div>
                <div className="w-full bg-gray-700 h-[2px]"></div>
                <div className="flex flex-col max-h-[160px] mt-2 p-2 overflow-y-auto overflow-x-hidden shadow-inner shadow-gray-600/40">
                  <Comments comments={item?.comments} />
                </div>
                <div className="flex flex-col">
                  <div className="flex w-100 justify-content-center">
                    <button
                      type="button"
                      className="p-1 text-decoration-none"
                      style={{ color: "#b0b3b8" }}
                      onClick={(e) => onShowCommentSection(e, item)}
                    >
                      Add comment
                    </button>
                  </div>
                  {item?.showCommentSection && (
                    <>
                      {!addComments.isError && addComments.isLoading && (
                        <Loader />
                      )}
                      {addComments.isError &&
                        !addComments.isLoading &&
                        addComments.error instanceof Error && (
                          <StatusMessage
                            from="posts"
                            status="error"
                            message={addComments.error.message}
                          />
                        )}
                      {<AddComments item={item} onAddComment={onAddComment} />}
                    </>
                  )}
                </div>
              </div>
            );
          })
      ) : (
        <p>No posts to display!</p>
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
