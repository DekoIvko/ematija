import React, { useRef, useState } from "react";
import { IPosts } from "../../../../interfaces/IPosts";
import Comments from "../Comments/Comments";
import { Loader, Pagination, StatusMessage } from "../../../../components";
import AddComments from "../AddComments/AddComments";
import { AxiosResponse } from "axios";
import { AddCommentService } from "../../../../services/CommentsService";
import { IParamComment } from "../../../../interfaces/IParamComment";

// implement add comment with react query with useMutation and setQueryData
const Posts = ({ posts }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  let inputAddComment = useRef<any>("");
  const [errorAddComment, setErrorAddComment] = useState<Error>();
  const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);

  const onShowCommentSection = (post: IPosts) => {
    const showCommentSect = posts?.map((item: any) => {
      if (item.id === post.id) {
        return { ...item, showCommentSection: !item.showCommentSection };
      }
      return item;
    });
    // setAllPosts!(showCommentSect);
  };

  const onAddComment = async (post: IPosts) => {
    setLoadingAddComment(true);
    try {
      const paramComment: IParamComment = {
        body: inputAddComment.current?.value,
        postId: post.id,
        userId: post?.user.id,
      };

      const { status, data }: AxiosResponse = await AddCommentService(
        paramComment
      );

      if (status === 200) {
        const showCommentSect = posts?.map((item: any) => {
          if (item.id === post.id) {
            item.comments.push({
              body: data.body,
              id: item?.comments?.length + 1,
              postId: data.postId,
              user: {
                id: data.user.id,
                username: data.user.username,
              },
            });
          }
          return item;
        });
        // setAllPosts!(showCommentSect);
      } else {
        setErrorAddComment(data?.message);
      }
    } catch (error: any) {
      setErrorAddComment(error.message);
    } finally {
      onShowCommentSection(post);
      setLoadingAddComment(false);
    }
  };
  console.log("posts posts", posts);
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
                        onClick={() => onShowCommentSection(item)}
                      >
                        Add comment
                      </button>
                    </div>
                    {item?.showCommentSection && (
                      <>
                        {!errorAddComment && loadingAddComment && <Loader />}
                        {errorAddComment && !loadingAddComment && (
                          <StatusMessage
                            status="error"
                            message={errorAddComment.message}
                          />
                        )}
                        {!errorAddComment && !loadingAddComment && (
                          <AddComments
                            item={item}
                            newComment={inputAddComment}
                            onAddComment={onAddComment}
                          />
                        )}
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
