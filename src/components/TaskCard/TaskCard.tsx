/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import FeatherIcon from "feather-icons-react"; // Assuming you're using Feather icons
import { default as UserIcon } from "../../assets/usericon.svg";

const TaskCard = ({ item, index }: any) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="justify-start w-full outline-none border-none focus:border-none focus:outline-none flex flex-col items-start p-4 min-h-[106px] rounded-md max-w-[311px] bg-white mt-4 shadow-sm"
        >
          {/* Task Title */}

          <p className="text-base font-medium mb-2 line-clamp-2 text-start">{item.Task}</p>

          {/* Status, Date, and Metadata Section */}
          <div className="flex gap-2 w-full items-center">
            <div className="bg-grey h-6 rounded-[4px]">
              <div
                className={`absolute w-[4px] h-6 ${
                  item.status === "Feito"
                    ? "bg-green-color"
                    : item.status === "In Progress"
                    ? "bg-yellow-color"
                    : item.status === "Done"
                    ? "bg-red-color"
                    : ""
                } rounded-l-[4px]`}
              ></div>
              {/* Task Status Label */}
              <span className={`px-2 text-sm text-dark-black`}>{item.status}</span>
            </div>
            {/* Due Date with Calendar Icon */}
            <div className="flex bg-grey h-6 rounded-[4px] px-2 items-center justify-center text-dark-black">
              <FeatherIcon icon="calendar" size={14} className="mr-1 text-sm text-[#676879]" />
              <h1 className="text-sm">
                {new Date(item.Due_Date)
                  .toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })
                  .replace("de", "")
                  .replace(".", "")}
              </h1>
            </div>
          </div>

          {/* Assigned User and Metadata Icons */}
          <div className="flex justify-between items-center w-full mt-3">
            {/* Assigned User */}
            <div className="flex items-center">
              <img src={UserIcon} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
