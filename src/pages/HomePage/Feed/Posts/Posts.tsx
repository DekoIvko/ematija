import React, { useState } from "react";
import { IPosts } from "../../../../interfaces/IPosts";
import Comments from "../Comments/Comments";
import { Loader, Pagination, StatusMessage } from "../../../../components";
import AddComments from "../AddComments/AddComments";
import { AddCommentService } from "../../../../services/CommentsService";
import { IParamComment } from "../../../../interfaces/IParamComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// implement add comment with react query with useMutation and setQueryData
const Posts = ({ posts = [], state }: any) => {
  console.log("Components Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const addComments = useMutation({
    mutationFn: AddCommentService,
    onSuccess: (result, variables) => {
      const updatedPosts = posts?.map((item: any) => {
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
    },
  });

  const onShowCommentSection = (
    e: React.MouseEvent<HTMLButtonElement>,
    post: IPosts
  ) => {
    e.preventDefault();
    const showCommentSect = posts?.map((item: any) => {
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
        userId: state?.loggedUser?.id.toString(),
      };

      await addComments.mutateAsync(paramComment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts
        ? posts
            // ?.slice(currentPage, currentPage + 10)
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
                              from="posts"
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
