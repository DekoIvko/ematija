import React, { useState } from "react";
import { IPosts } from "../../../interfaces/IPosts";
import { Pagination } from "../../../components";
import { IComments } from "../../../interfaces/IComments";

import "./HomeFeed.scss";
interface IProps {
  allPosts: IPosts[];
}

const HomeFeed = ({ allPosts }: IProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="home-feed">
      {allPosts ? (
        <>
          {allPosts
            .slice(currentPage, currentPage + 10)
            .map((item: IPosts, index: number) => {
              return (
                <div
                  key={item?.title + "_" + index}
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
                    {item?.tags.map((tag: string) => {
                      return <span key={tag}>{`#${tag}`}</span>;
                    })}
                  </div>
                  <div className="comments d-flex flex-column">
                    {item?.comments
                      ? item?.comments.map((comment: IComments) => {
                          return (
                            <div key={comment.id}>
                              <div className="comment-user-details p-1">
                                {comment?.user?.username}
                              </div>
                              <div className="comment-body p-3 m-1">
                                {comment?.body}
                              </div>
                            </div>
                          );
                        })
                      : null}
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

export default HomeFeed;
