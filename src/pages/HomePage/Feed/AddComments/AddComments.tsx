import { useEffect, useRef } from "react";
import { IPosts } from "../../../../interfaces/IPosts";

interface IProps {
  item: IPosts;
  onAddComment: Function;
}

const AddComments = ({ item, onAddComment }: IProps) => {
  let newComment = useRef<HTMLInputElement>(null);

  useEffect(() => {
    newComment.current?.focus();
  }, []);

  return (
    <div className="flex w-full">
      <input className="w-full rounded-l p-1 text-slate-800" ref={newComment} />
      <button
        className="bg-white text-gray-600 rounded-r p-1 border"
        onClick={(e) => onAddComment(e, item, newComment.current?.value)}
      >
        Add
      </button>
    </div>
  );
};

export default AddComments;
