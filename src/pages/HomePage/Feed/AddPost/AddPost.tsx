import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { IPosts } from "../../../../interfaces/IPosts";
import { useUserAuthContext } from "../../../../context/UserAuthContext";
import { useAppSelector } from "../../../../store/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AddPostService } from "../../../../services/PostsService";

type Inputs = {
  postBody: string;
  postTags: string;
};

const AddPost = () => {
  const [openModal, setOpenModal] = useState(false);
  const userAuth = useUserAuthContext();
  const appSettings = useAppSelector((state) => state.appSettings);
  const queryClient = useQueryClient();
  const [post, setPost] = useState<IPosts>({
    id: 0,
    title: "",
    body: "",
    userId: userAuth.user.id,
    tags: [],
    reactions: [],
    comments: [],
    showCommentSection: false,
  });

  const handleOpen = () => setOpenModal((prevVal) => !prevVal);

  const { register, handleSubmit, setFocus } = useForm<Inputs>();

  const addPost = useMutation({
    mutationFn: AddPostService,
    onSuccess: async (result, variables) => {
      await queryClient.refetchQueries(["posts"]);
      setOpenModal((prev) => (prev = false));
      toast.success("Success add post!");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async () => {
    await addPost.mutateAsync(post);
  };

  const afterOpenModal = () => {
    setFocus("postBody");
    setPost((prevObj) => ({ ...prevObj, body: "", tags: [] }));
  };

  const onAddTags = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setPost((prevPost) => ({
      ...prevPost,
      tags: value.split(" "),
    }));
  };

  return (
    <div className="dialog flex justify-center">
      <button
        onClick={() => handleOpen()}
        className={`w-full outline-none p-2 mt-2 font-bold rounded ${
          appSettings.appTheme === "dark"
            ? "text-slate-200 bg-gray-800 hover:bg-gray-200 hover:text-slate-800"
            : "text-slate-800 bg-gray-200 hover:bg-gray-800 hover:text-slate-200"
        } `}
      >
        What is on your mind?
      </button>

      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleOpen}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="flex flex-col w-[400px] absolute top-[30%] left-[40%] h-auto bg-gray-400 rounded p-4 shadow-xl"
      >
        <div className="flex justify-center p-2 mb-2">
          <h2 className="text-xl w-full flex justify-center">Create a post</h2>
          <div
            className="absolute right-4 top-5 cursor-pointer p-2 rounded-full hover:bg-slate-600"
            onClick={() => {
              handleOpen();
            }}
          >
            <IoMdClose size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            id="textarea-body"
            className="mt-1 mb-2 w-full h-36 bg-gray-400 text-slate-800 p-1 px-2 py-1 rounded overflow-hidden outline-none text-xl placeholder-slate-200"
            placeholder="What is on your mind?"
            {...register("postBody")}
            value={post?.body || ""}
            onChange={(e) =>
              setPost((prevPost) => ({ ...prevPost, body: e.target.value }))
            }
          />
          <textarea
            className="mt-1 mb-2 w-full h-10 bg-gray-400 text-slate-800 p-1 px-2 py-1 rounded overflow-hidden outline-none text-xl placeholder-slate-200"
            placeholder="What about tags?"
            {...register("postTags")}
            value={post.tags}
            onChange={(e) => onAddTags(e)}
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-800 text-white text-center p-2 rounded font-bold w-full mt-2"
          >
            Post
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddPost;
