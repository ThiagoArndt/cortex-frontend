import FeatherIcon from "feather-icons-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import TaskNameItem from "./TaskNameItem";
import AssignerTask from "./AssignerTask";
import DateTask from "./DateTask";
import GroupTask from "./GroupTask";
import StatusTask from "./StatusTask";
import {
  GroupDTO,
  TaskResponse,
  TaskDtoStatusEnum,
  UserDTO,
  CommentResponse,
  CommentRequest,
} from "../types/Api";

import { formatDateToString } from "../utils/dateUtils";
import CommentTask from "./CommentTask";
import { addComment } from "../lib/services/commentService";

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
    const [taskComments, setTaskComments] = useState<CommentResponse[]>(task.comments ?? []);
    const [isTaskUpdated, setIsTaskUpdated] = useState<boolean>(false);

    const handleUpdateTask = () => {
      const updatedTask = {
        taskId: task.taskId,
        assignedTo: taskUser != null ? taskUser.userId : null,
        dueDate: formatDateToString(taskDate),
        groupId: taskGroup.groupId,
        status: taskStatus,
        taskName: taskName,
        comments: taskComments,
      };

      return updatedTask;
    };

    useImperativeHandle(ref, () => ({
      handleUpdateTask,
      isTaskUpdated,
    }));

    const handleAddComment = async (comment: CommentRequest): Promise<CommentResponse> => {
      return await addComment(comment, task.taskId!);
    };

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

        <CommentTask
          handleAddComment={handleAddComment}
          setTaskComments={setTaskComments}
          taskComments={taskComments}
          setIsTaskUpdated={setIsTaskUpdated}
        />
      </div>
    );
  }
);

export default TaskEditContent;
