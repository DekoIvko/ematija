import { AiTwotoneLike } from "react-icons/ai";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { FaRegLaughBeam } from "react-icons/fa";
import { BsEmojiAngry } from "react-icons/bs";

export const reactions = [
  {
    description: "like",
    icon: <AiTwotoneLike style={{ width: 22, height: 22 }} />,
  },
  {
    description: "love",
    icon: <BsEmojiHeartEyes style={{ width: 22, height: 22 }} />,
  },
  {
    description: "care",
    icon: <BsEmojiHeartEyes style={{ width: 22, height: 22 }} />,
  },
  {
    description: "laugh",
    icon: <FaRegLaughBeam style={{ width: 22, height: 22 }} />,
  },
  {
    description: "angry",
    icon: <BsEmojiAngry style={{ width: 22, height: 22 }} />,
  },
];
