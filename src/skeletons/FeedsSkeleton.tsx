const FeedsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col rounded p-2 my-2 bg-gray-800">
        <div className="flex flex-col gap-3 relative">
          <div className="flex gap-1 items-end align-items-end">
            <img
              src={""}
              alt=""
              className="max-w-[30px] rounded-xl bg-slate-400"
            />
            <span className="h-8 w-full bg-slate-400"></span>
          </div>
        </div>
        <div className="py-4 px-2">
          <div className="h-20 w-full bg-slate-400"></div>
        </div>
        <div className="w-full bg-gray-700 h-[2px]"></div>
        <div className="flex flex-row gap-3 p-1">
          <span className="h-10 w-full bg-slate-400"></span>
        </div>
        <div className="w-full bg-gray-700 h-[2px]"></div>
        <div className="flex flex-col max-h-[160px] mt-2 p-2 shadow-inner shadow-gray-600/40">
          <div className="comment-body p-3 m-1 h-3 w-full bg-slate-400"></div>
          <div className="comment-body p-3 m-1 h-3 w-full bg-slate-400"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-center">
            <button
              type="button"
              className="p-1 text-decoration-none text-slate-400 h-4 w-full"
            ></button>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded p-2 my-2 bg-gray-800">
        <div className="flex flex-col gap-3 relative">
          <div className="flex gap-1 items-end align-items-end">
            <img
              src={""}
              alt=""
              className="max-w-[30px] rounded-xl bg-slate-400"
            />
            <span className="h-10 w-full bg-slate-400"></span>
          </div>
        </div>
        <div className="py-4 px-2">
          <div className="h-20 w-full bg-slate-400"></div>
        </div>
        <div className="w-full bg-gray-700 h-[2px]"></div>
        <div className="flex flex-row gap-3 p-1">
          <span className="h-10 w-full bg-slate-400"></span>
        </div>
        <div className="w-full bg-gray-700 h-[2px]"></div>
        <div className="flex flex-col max-h-[160px] mt-2 p-2 shadow-inner shadow-gray-600/40">
          <div className="comment-body p-3 m-1 h-3 w-full bg-slate-400"></div>
          <div className="comment-body p-3 m-1 h-3 w-full bg-slate-400"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-center">
            <button
              type="button"
              className="p-1 text-decoration-none text-slate-400 h-5 w-full"
            ></button>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded p-2 my-2 bg-gray-800">
        <div className="flex flex-col gap-3 relative">
          <div className="flex gap-1 items-end align-items-end">
            <img
              src={""}
              alt=""
              className="max-w-[30px] rounded-xl bg-slate-400"
            />
            <span className="h-10 w-full bg-slate-400"></span>
          </div>
        </div>
        <div className="py-4 px-2">
          <div className="h-20 w-full bg-slate-400"></div>
        </div>
        <div className="w-full bg-gray-700 h-[2px]"></div>
        <div className="flex flex-row gap-3 p-1">
          <span className="h-10 w-full bg-slate-400"></span>
        </div>
        <div className="w-full bg-gray-700 h-[2px]"></div>
        <div className="flex flex-col max-h-[160px] mt-2 p-2 shadow-inner shadow-gray-600/40">
          <div className="comment-body p-3 m-1 h-3 w-full bg-slate-400"></div>
          <div className="comment-body p-3 m-1 h-3 w-full bg-slate-400"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-center">
            <button
              type="button"
              className="p-1 text-decoration-none text-slate-400 h-5 w-full"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedsSkeleton;
