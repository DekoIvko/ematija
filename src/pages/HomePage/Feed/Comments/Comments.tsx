import { IComments } from "../../../../interfaces/IComments";

interface IProps {
  comments: IComments[];
}

const Comments = ({ comments }: IProps) => {
  return (
    <>
      {" "}
      {comments ? (
        comments.map((comment: IComments, index: number) => {
          return (
            <div key={comment.id + "_" + index}>
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

export default Comments;
