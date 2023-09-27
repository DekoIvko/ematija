import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Loader, Pagination, StatusMessage } from "../../../components";
import { IStateContext, StateContext } from "../../../store/store";
import { AxiosResponse } from "axios";

import { IPosts } from "../../../interfaces/IPosts";
import { IComments } from "../../../interfaces/IComments";
import { IParamComment } from "../../../interfaces/IParamComment";

import {
  AddCommentService,
  GetAllCommentsService,
} from "../../../services/CommentsService";
import {
  GetPostsService,
  GetUserPostsService,
} from "../../../services/PostsService";
import { GetUsersService } from "../../../services/UsersService";
import { IUserDetails } from "../../../interfaces/IUserDetails";
import AddComments from "./AddComments/AddComments";
import Comments from "./Comments/Comments";
import "./Feed.scss";

interface IProps {
  feedType: string;
  userData?: any;
}

const Feed = ({ feedType, userData }: IProps) => {
  let inputAddComment = useRef<any>("");
  const { state } = useContext<IStateContext>(StateContext);
  const [allPosts, setAllPosts] = useState<IPosts[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [errorAddComment, setErrorAddComment] = useState<Error>();
  const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);

  const getAllPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const { status, data }: AxiosResponse = await GetPostsService();
      const allUsers: AxiosResponse = await GetUsersService();
      const allComments: AxiosResponse = await GetAllCommentsService();

      if (status === 200) {
        data?.posts.forEach((post: IPosts) => {
          const user = allUsers?.data?.users.find(
            (user: IUserDetails) => post?.userId === user.id
          );
          const comments = allComments?.data?.comments.filter(
            (comment: IComments) => post.id === comment.postId
          );
          if (user) {
            return {
              ...post,
              user: user,
              comments: comments,
              showCommentSection: false,
            };
          } else {
            return post;
          }
        });
        setAllPosts(data.posts);
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingPosts(false);
    }
  }, [allPosts]);

  const getUserPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const { status, data }: AxiosResponse = await GetUserPostsService(
        state?.loggedUser?.id.toString()
      );
      const allComments: AxiosResponse = await GetAllCommentsService();

      if (status === 200) {
        data?.posts.forEach((post: IPosts) => {
          const comments = allComments?.data?.comments.filter(
            (comment: IComments) => post.id === comment.postId
          );
          return {
            ...post,
            user: userData,
            comments: comments,
            showCommentSection: false,
          };
        });

        setAllPosts(data.posts);
      } else if (status > 300) {
        setError(data?.message);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingPosts(false);
    }
  }, [allPosts]);

  useEffect(() => {
    if (feedType === "home-page") {
      getAllPosts();
    } else if (feedType === "profile-page") {
      getUserPosts();
    }
  }, [feedType]);

  const onShowCommentSection = (post: IPosts) => {
    const showCommentSect = allPosts?.map((item) => {
      if (item.id === post.id) {
        return { ...item, showCommentSection: !item.showCommentSection };
      }
      return item;
    });
    setAllPosts!(showCommentSect);
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
        const showCommentSect = allPosts?.map((item) => {
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
        setAllPosts!(showCommentSect);
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

  return (
    <div className="home-feed">
      {loadingPosts && !error && <Loader />}
      {!loadingPosts && error && (
        <StatusMessage status="error" message={error.message} />
      )}
      {!loadingPosts && !error && allPosts ? (
        <>
          {allPosts
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
            })}
          <Pagination
            currentPage={currentPage}
            total={allPosts?.length}
            limit={10}
            onPageChange={(page: any) => setCurrentPage(page)}
          />
        </>
      ) : null}
    </div>
  );
};

export default Feed;
