import { default as UserIcon } from "../assets/usericon.svg";
import { CommentRequest, CommentResponse } from "../types/Api";
import { formatDateWithHour } from "../utils/dateUtils";
import { SimpleEditor } from "./SimpleEditor";
import FeatherIcon from "feather-icons-react";

interface CommentTask {
  setIsTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskComments: React.Dispatch<React.SetStateAction<CommentResponse[]>>;
  taskComments: CommentResponse[];
  handleAddComment: (comment: CommentRequest) => Promise<CommentResponse>;
}

function CommentTask({
  setIsTaskUpdated,
  setTaskComments,
  taskComments,
  handleAddComment,
}: Readonly<CommentTask>) {
  const addComment = async (comment: string) => {
    try {
      const newComment = await handleAddComment({ content: comment });
      setTaskComments((prevComments) => [...prevComments, newComment]);
      setIsTaskUpdated(true);
    } catch (error) {
      console.error("Falha ao adicionar comentário", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 ml-[50px] flex-1 pt-[56px] min-w-[490px]">
      <div>
        <div className="border-[2px] bg-transparent border-background-color rounded-md p-2 text-gray-900 focus:outline-none">
          <SimpleEditor handleAddComment={addComment} />
        </div>
      </div>
      <div className="overflow-y-auto flex flex-col gap-8">
        {taskComments.map((item) => (
          <div
            key={item.commentId}
            className="justify-start p-4 items-start flex-row rounded-md flex border-[2px] min-h-[135px] h-auto border-background-color"
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <img alt="" src={UserIcon} className="w-10 aspect-square" />
                  <h1 className="text-dark-black flex flex-row items-center gap-2">
                    {item.user?.username}
                    <span>
                      <div className="w-[9px] h-[9px] bg-green-400 rounded-full"></div>
                    </span>
                  </h1>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <FeatherIcon size={12} className="text-light-grey" icon="clock" />
                  <h1 className="text-light-grey text-sm">{formatDateWithHour(item.createdAt)}</h1>
                </div>
              </div>
              <h1
                dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
                className="text-dark-black"
              ></h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentTask;
