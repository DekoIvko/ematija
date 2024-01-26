import { useUserAuthContext } from "../../context/UserAuthContext";
import { IPosts } from "../../interfaces/IPosts";
import { IReactions } from "../../interfaces/IReactions";
import { reactions } from "../../utils/reactions";

interface IProps {
  onPostReactions: Function;
  post: IPosts;
}

const Reactions = ({ post, onPostReactions }: IProps) => {
  const user = useUserAuthContext();

  const reacted = (react: IReactions) => {
    return post.reactions?.map((reaction: any): boolean => {
      return react.description === reaction?.reaction &&
        reaction?.userId === user?.user.id
        ? true
        : false;
    });
  };
  return (
    <>
      {reactions?.map((reaction: IReactions) => {
        return (
          <span
            className={`cursor-pointer  ${
              reacted(reaction)[0] ? "text-rose-900" : ""
            }`}
            key={reaction.description}
            onClick={() => onPostReactions(post, reaction.description)}
            onMouseEnter={() => {
              return <span>{reaction.description}</span>;
            }}
          >
            {reaction.icon}
          </span>
        );
      })}
    </>
  );
};

export default Reactions;
