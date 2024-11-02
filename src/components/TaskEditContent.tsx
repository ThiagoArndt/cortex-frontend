import FeatherIcon from "feather-icons-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import TaskNameItem from "./TaskNameItem";
import AssignerTask from "./AssignerTask";
import DateTask from "./DateTask";
import GroupTask from "./GroupTask";
import StatusTask from "./StatusTask";
import { GroupDTO, TaskResponse, TaskDtoStatusEnum, UserDTO } from "../types/Api";
import { default as UserIcon } from "../assets/usericon.svg";
import { formatDateToString } from "../utils/dateUtils";

interface TaskEditContent {
  task: TaskResponse;
  groups: GroupDTO[];
  selectedGroup: GroupDTO;
  projectUsers: UserDTO[];
  projectName: string | null;
}

const TaskEditContent = forwardRef(
  ({ task, groups, selectedGroup, projectUsers, projectName }: TaskEditContent, ref) => {
    const [taskGroup, setTaskGroup] = useState<GroupDTO>(selectedGroup);
    const [taskUser, setTaskUser] = useState<UserDTO | null>(task.assignedTo ?? null);
    const [taskName, setTaskName] = useState<string>(task.taskName!);
    const [taskDate, setTaskDate] = useState(
      task.dueDate != null ? new Date(task.dueDate) : new Date()
    );
    const [taskStatus, setTaskStatus] = useState<TaskDtoStatusEnum>(task.status!);
    const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false);

    const handleUpdateTask = () => {
      const updatedTask = {
        taskId: task.taskId,
        assignedTo: taskUser != null ? taskUser.userId : null,
        dueDate: formatDateToString(taskDate),
        groupId: taskGroup.groupId,
        status: taskStatus,
        taskName: taskName,
      };

      return updatedTask;
    };

    useImperativeHandle(ref, () => ({
      handleUpdateTask,
      isTaskUpdated,
    }));

    return (
      <div className="flex h-full flex-row">
        <div className="flex flex-col gap-3">
          <h1 className="text-dark-black font-bold text-3xl">{task.taskName}</h1>
          <div className=" min-w-[512px] flex flex-col gap-10 text-dark-black px-1">
            <div className="flex flex-row gap-2 items-center">
              in{" "}
              <span>
                <FeatherIcon icon="arrow-right" size={15} />
              </span>
              {projectName}
            </div>
            <div className="flex flex-col gap-3">
              <GroupTask
                groups={groups}
                selectedTaksGroup={taskGroup}
                setSelectedTaskGroup={(e) => {
                  setTaskGroup(e);
                  setIsTaskUpdated(true);
                }}
              />
              <TaskNameItem
                taskName={taskName}
                setTaskName={(e) => {
                  setTaskName(e);
                  setIsTaskUpdated(true);
                }}
              />
              <AssignerTask
                projectUsers={projectUsers}
                setSelectedTaskUser={(e) => {
                  setTaskUser(e);
                  setIsTaskUpdated(true);
                }}
                selectedTaskUser={taskUser}
              />
              <StatusTask
                status={taskStatus}
                setTaskStatus={(e) => {
                  setTaskStatus(e);
                  setIsTaskUpdated(true);
                }}
              />
              <DateTask
                setTaskDate={(e) => {
                  setTaskDate(e);
                  setIsTaskUpdated(true);
                }}
                taskDate={taskDate}
              />
            </div>
          </div>
        </div>

        <div className="w-[2px] h-[100%] bg-background-color">.</div>

        <div className="flex flex-col gap-10 ml-[50px] flex-1 pt-[56px] min-w-[490px]">
          <div>
            <textarea
              placeholder="Escreva uma atualização"
              id="autoExpandTextarea"
              className="w-full border-[2px] bg-transparent border-background-color rounded-md p-2 text-gray-900 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
              rows={1}
              onInput={(event) => {
                const textarea = event.target as HTMLTextAreaElement;
                textarea.style.height = "auto";
                const maxRows = 3;
                const lineHeight = 24;
                const maxHeight = lineHeight * maxRows;
                textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
              }}
            ></textarea>
          </div>
          <div className="justify-start p-4 items-start flex-row rounded-md flex border-[2px] min-h-[135px] h-auto border-background-color">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img alt="" src={UserIcon} className="w-10 aspect-square" />
                <h1 className="text-dark-black flex flex-row items-center gap-2">
                  Thiago
                  <span>
                    <div className="w-[9px] h-[9px] bg-green-400 rounded-full"></div>
                  </span>
                </h1>
              </div>
              <h1 className="text-dark-black">teste teste</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TaskEditContent;
