import { IPosts } from "../../../../interfaces/IPosts";

interface IProps {
  item: IPosts;
  newComment: any;
  onAddComment: Function;
  setNewComment?: Function;
}

const AddComments = ({ item, newComment, onAddComment }: IProps) => {
  return (
    <>
      <div className="input-group add-comment-input d-flex">
        <textarea className="form-control" ref={newComment}></textarea>
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
