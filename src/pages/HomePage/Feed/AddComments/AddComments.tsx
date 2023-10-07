import { useRef } from "react";
import { IPosts } from "../../../../interfaces/IPosts";

interface IProps {
  item: IPosts;
  onAddComment: Function;
  setNewComment?: Function;
}

const AddComments = ({ item, onAddComment }: IProps) => {
  console.log("Component AddComments");
  let newComment = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="input-group add-comment-input d-flex">
        <input className="form-control" ref={newComment} />
        <button
          className="btn btn-secondary"
          onClick={() => onAddComment(item, newComment.current?.value)}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddComments;
