import React from "react";

interface IProps {
  allPosts: any;
}

const HomeFeed = ({ allPosts }: IProps) => {
  return (
    <div>
      {" "}
      {allPosts
        ? allPosts.map((item: any, index: number) => {
            return (
              <div
                key={item?.title + "_" + index}
                className="posts d-flex flex-column"
              >
                <div className="post-header d-flex flex-column gap-3">
                  <span>{`${item?.user?.firstName} ${item?.user?.lastName}`}</span>
                  <h4>{item?.title}</h4>
                </div>
                <div className="post-body d-flex">
                  <div className="post-body-comment-text text-left">
                    {item?.body}
                  </div>
                </div>
                <div className="post-tags d-flex flex-row gap-3">
                  {item?.tags.map((tag: string) => {
                    return <span key={tag}>{tag}</span>;
                  })}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default HomeFeed;
