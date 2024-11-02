import { Draggable } from "react-beautiful-dnd";
import FeatherIcon from "feather-icons-react";
import { default as UserIcon } from "../assets/usericon.svg";
import { TaskResponse } from "../types/Api";
import { STATUS_MAPPINGS } from "../utils/mappings";
import { formatDate } from "../utils/dateUtils";

interface TaskCardInterface {
  item: TaskResponse;
  index: number;
}

const TaskCard = ({ item, index }: TaskCardInterface) => {
  return (
    <Draggable key={item.taskId} draggableId={item.taskId!.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className=" justify-start w-full outline-none border-none focus:border-none focus:outline-none flex flex-col items-start p-4 min-h-[106px] rounded-md max-w-[311px] bg-white mt-4 shadow-sm"
        >
          <p className="text-base font-medium mb-2 line-clamp-2 text-start">{item.taskName}</p>

          <div className="flex gap-2 w-full items-center">
            <div className="bg-grey h-6 rounded-[4px]">
              <div
                className={`absolute w-[4px] h-6 ${
                  item.status === "TODO"
                    ? "bg-green-color"
                    : item.status === "IN_PROGRESS"
                    ? "bg-yellow-color"
                    : item.status === "DONE"
                    ? "bg-red-color"
                    : ""
                } rounded-l-[4px]`}
              ></div>

              <span className={`px-2 text-sm text-dark-black`}>
                {" "}
                {STATUS_MAPPINGS[item.status!]}
              </span>
            </div>

            {item.dueDate === null ? null : (
              <div className="flex bg-grey h-6 rounded-[4px] px-2 items-center justify-center text-dark-black">
                <FeatherIcon icon="calendar" size={14} className="mr-1 text-sm text-[#676879]" />
                <h1 className="text-sm">{formatDate(new Date(item.dueDate!))}</h1>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center w-full mt-3">
            <div className="flex items-center">
              {item.assignedTo === null ? null : <img alt="" src={UserIcon} />}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
