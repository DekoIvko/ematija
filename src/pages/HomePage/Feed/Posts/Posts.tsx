import React, { useState } from "react";
import { IPosts } from "../../../../interfaces/IPosts";
import Comments from "../Comments/Comments";
import { Loader, Pagination, StatusMessage } from "../../../../components";
import AddComments from "../AddComments/AddComments";
import { AddCommentService } from "../../../../services/CommentsService";
import { IParamComment } from "../../../../interfaces/IParamComment";
import { QueryCache, useMutation, useQueryClient } from "@tanstack/react-query";

// implement add comment with react query with useMutation and setQueryData
const Posts = ({ posts = [] }: any) => {
  console.log("Components Posts", posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCommentSectionPost, setShowCommentSectionPost] = useState(false);
  const queryClient = useQueryClient();

  const addComments = useMutation({
    mutationFn: AddCommentService,
    onSuccess: (data) => {
      console.log(data);
      debugger;
      queryClient.setQueryData(["posts", data.data.postId], (oldData) => {
        console.log(oldData);
      });
      queryClient.invalidateQueries(["posts"], { exact: true });
    },
  });

  const onShowCommentSection = (
    e: React.MouseEvent<HTMLButtonElement>,
    post: IPosts
  ) => {
    e.preventDefault();

    // const showCommentSect = posts?.map((item: any) => {
    //   if (item.id === post.id) {
    //     return { ...item, showCommentSection: !item.showCommentSection };
    //   }
    //   return item;
    // });
    // return showCommentSect;
    // console.log(posts);
    // console.log(showCommentSect);
    // setAllPosts!(showCommentSect);
    // };
    // useMutation(data, {
    //   // mutationFn: onShowCommentSection,
    //   onMutate: (post: any) => {
    //     const previousTodos = queryClient.getQueryData(["posts"]);

    //     queryClient.setQueryData(["posts"], (item: any) => [...item, post]);

    //     // Return a context object with the snapshotted value
    //     return { previousTodos };
    // },
  };

  const onAddComment = async (post: IPosts, newComment: string) => {
    try {
      const paramComment: IParamComment = {
        body: newComment,
        postId: post.id,
        userId: post?.user.id,
      };
      console.log(newComment);

      addComments.mutate(paramComment);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log("posts posts", posts);
  return (
    <>
      {posts
        ? posts
            ?.slice(currentPage, currentPage + 10)
            ?.map((item: IPosts, index: number) => {
              return (
                <div
                  key={item?.id + "_" + index}
                  className="posts d-flex flex-column"
                >
                  <div className="post-header d-flex flex-column gap-3">
                    <div className="d-flex flex-row gap-1 align-items-end">
                      <img src={item?.user?.image} alt="Profile" />
                      <span>{`${item?.user?.firstName} ${item?.user?.lastName}`}</span>
                    </div>
                    <h4>{item?.title}</h4>
                  </div>
                  <div className="post-body d-flex">
                    <div className="post-body-comment-text text-left">
                      {item?.body}
                    </div>
                  </div>
                  <div className="post-tags d-flex flex-row gap-3">
                    {item?.tags.map((tag: string, index: number) => {
                      return <span key={tag + "_" + index}>{`#${tag}`}</span>;
                    })}
                  </div>
                  <div className="comments d-flex flex-column">
                    <Comments comments={item?.comments} />
                  </div>
                  <div className="add-comment d-flex flex-column">
                    <div className="d-flex w-100 justify-content-center">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none"
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
                              status="error"
                              message={addComments.error.message}
                            />
                          )}
                        {
                          <AddComments
                            item={item}
                            onAddComment={onAddComment}
                          />
                        }
                      </>
                    )}
                  </div>
                </div>
              );
            })
        : null}
      <Pagination
        currentPage={currentPage}
        total={posts?.length || 1}
        limit={10}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </>
  );
};

export default Posts;
