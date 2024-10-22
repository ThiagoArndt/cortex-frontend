/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import FeatherIcon from "feather-icons-react"; // Assuming you're using Feather icons

const TaskCard = ({ item, index }: any) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="outline-none border-none focus:border-none focus:outline-none flex flex-col justify-center items-start p-4 min-h-[106px] rounded-md max-w-[311px] bg-white mt-4 shadow-sm"
        >
          {/* Task Title */}
          <p className="text-base font-medium mb-2">{item.Task}</p>

          {/* Status, Date, and Metadata Section */}
          <div className="flex justify-between w-full items-center">
            <div className="bg-grey h-6 rounded-[4px]">
              <div className="absolute w-[4px] h-6 bg-green-400 rounded-l-[4px]"></div>
              {/* Task Status Label */}
              <span
                className={`px-2 text-sm ${
                  item.Status === "Parado" ? "" : item.Status === "Em andamento" ? "" : ""
                }`}
              >
                {item.status}
              </span>
            </div>
            {/* Due Date with Calendar Icon */}
            <div className="flex items-center text-xs text-gray-500">
              <FeatherIcon icon="calendar" size={14} className="mr-1" />
              {new Date(item.Due_Date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })}
            </div>
          </div>

          {/* Assigned User and Metadata Icons */}
          <div className="flex justify-between items-center w-full mt-3">
            {/* Assigned User */}
            <div className="flex items-center">
              <FeatherIcon icon="user" size={20} className="text-black mr-2" />
              <p className="text-xs text-gray-600">{item.Assigned_To || "Ninguém"}</p>
            </div>

            {/* Comments and Task Info Icons */}
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              {/* Comments Icon */}
              <div className="flex items-center">
                <FeatherIcon icon="message-circle" size={14} className="mr-1" />
                {item.CommentsCount || 0}
              </div>

              {/* Other Task Info */}
              <div className="flex items-center">
                <FeatherIcon icon="clipboard" size={14} className="mr-1" />
                {item.OtherInfo || 0}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
