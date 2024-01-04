import withCommentsLogic from "../../../../hooks/withCommentsLogic";
import { IComments } from "../../../../interfaces/IComments";

interface IProps {
  comments: IComments[];
  onClickComments: () => void;
}

const Comments = ({ comments, onClickComments }: IProps) => {
  return (
    <>
      {" "}
      {comments ? (
        comments.map((comment: IComments, index: number) => {
          return (
            <div
              key={comment.id + "_" + index}
              onClick={onClickComments}
              onScroll={() => console.log("loud!")}
            >
              <div className="comment-user-details p-1">
                {comment?.user?.username}
              </div>
              <div className="comment-body p-3 m-1">{comment?.body}</div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default withCommentsLogic(Comments);
