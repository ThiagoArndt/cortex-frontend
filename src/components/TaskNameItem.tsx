import FeatherIcon from "feather-icons-react";
import React from "react";

interface TaskNameItemInterface {
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
}

function TaskNameItem({ taskName, setTaskName }: Readonly<TaskNameItemInterface>) {
  return (
    <div className="flex flex-row items-center gap-24">
      <div className="flex flex-row gap-2 items-center">
        <FeatherIcon icon="type" size={17} />
        <h1 className="w-10">Nomear</h1>
      </div>
      <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
        <input
          value={taskName}
          onChange={(e) => {
            setTaskName(e.currentTarget.value);
          }}
          className="outline-none bg-transparent px-2 text-dark-black text-base font-medium"
        />
      </div>
    </div>
  );
}

export default TaskNameItem;
