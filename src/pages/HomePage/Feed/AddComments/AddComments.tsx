import { IPosts } from "../../../../interfaces/IPosts";

interface IProps {
  item: IPosts;
  newComment: string;
  onAddComment: Function;
  setNewComment: Function;
}

const AddComments = ({
  item,
  newComment,
  onAddComment,
  setNewComment,
}: IProps) => {
  return (
    <>
      <div className="input-group add-comment-input d-flex">
        <textarea
          className="form-control"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="btn btn-secondary"
          onClick={() => onAddComment(item)}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddComments;
