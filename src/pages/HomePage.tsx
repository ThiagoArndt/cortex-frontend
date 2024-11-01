import { useEffect, useRef, useState } from "react";
import logoImage from "../assets/logo.png";
import { default as UserIcon } from "../assets/usericon.svg";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "../components/TaskCard";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../components/Button";
import {
  createProject,
  deleteProject,
  exitProject,
  fetchAllProjects,
  getUsersOnProject,
  updateProject,
} from "../lib/services/projectService";
import {
  Columns,
  GroupDTO,
  ProjectDTO,
  ProjectInviteRequest,
  TaskDTO,
  TaskDtoStatusEnum,
  UserDTO,
} from "../types/Api";
import {
  createGroup,
  deleteGroup,
  fetchAllGroups,
  updateGroup,
} from "../lib/services/groupService";
import { createTask, fetchAllTasks, updateTask } from "../lib/services/taskService";
import { COLUMN_TITLE_TO_STATUS, transformTasksToColumns } from "../utils/mappings";
import GroupItem from "../components/GroupItem";
import GroupParentItem from "../components/GroupParentItem";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import InviteItem from "../components/InviteItem";
import { getColumnStatusColor } from "../utils/styleUtils";
import { sendEmailInvitation } from "../lib/services/emailService";
import TaskEditContent from "../components/TaskEditContent";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<GroupDTO | null>(null);
  const [groups, setGroups] = useState<GroupDTO[]>([]);

  const [tasks, setTasks] = useState<Columns>({
    "column-1": { title: "A Fazer", items: [] },
    "column-2": { title: "Em Andamento", items: [] },
    "column-3": { title: "Concluído", items: [] },
  });

  const [projectUsers, setProjectUsers] = useState<UserDTO[]>([]);

  const retriveAllTasks = async (groupId: number) => {
    try {
      const tasks = await fetchAllTasks(groupId);
      if (tasks.length > 0) {
        setTasks(transformTasksToColumns(tasks));
      }
    } catch (error) {
      console.error("Falha ao resgatar tarefas" + error);
    }
  };

  useEffect(() => {
    if (selectedGroup != null) {
      retriveAllTasks(selectedGroup.groupId!);
    }
  }, [selectedGroup]);

  const fetchTasksForGroup = async (groupId: number) => {
    try {
      const tasks = await fetchAllTasks(groupId);
      if (tasks.length > 0) {
        setTasks(transformTasksToColumns(tasks));
      } else {
        setTasks({
          "column-1": { title: "A Fazer", items: [] },
          "column-2": { title: "Em Andamento", items: [] },
          "column-3": { title: "Concluído", items: [] },
        });
      }
    } catch (error) {
      console.error("Falha ao resgatar tarefas" + error);
    }
  };

  useEffect(() => {
    const initializeProjectsAndGroups = async () => {
      try {
        const fetchedProjects = await fetchAllProjects();
        setProjects(fetchedProjects);

        if (fetchedProjects.length > 0) {
          const firstProject = fetchedProjects[0];
          await handleProjectChange(firstProject);
        }
      } catch (error) {
        console.error("Erro ao resgatar projetos:", error);
      }
    };

    initializeProjectsAndGroups();
  }, []);

  const handleGroupChange = (group: GroupDTO) => {
    setSelectedGroup(group);
    fetchTasksForGroup(group.groupId!);
  };

  const onDragEnd = async (
    result: any,
    columns: Columns | null,
    setColumns: React.Dispatch<React.SetStateAction<Columns>>
  ) => {
    if (!result.destination || columns === null) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      removed.status = COLUMN_TITLE_TO_STATUS[destColumn.title];

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      await updateTask(removed);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleRenameGroup = async (group: GroupDTO, newName: string) => {
    group = { ...group, groupName: newName };
    await updateGroup(group.groupId!, group);

    const updatedGroups = groups.map((g) =>
      g.groupId === group.groupId ? { ...g, groupName: newName } : g
    );
    setGroups(updatedGroups);
    setSelectedGroup({ ...group, groupName: newName });
  };

  const handleDeleteGroup = async (groupId: number) => {
    await deleteGroup(groupId);

    const updatedGroups = groups.filter((group) => group.groupId !== groupId);
    setGroups(updatedGroups);

    if (updatedGroups.length > 0) {
      const nextGroup = updatedGroups[0];
      setSelectedGroup(nextGroup);
      handleGroupChange(nextGroup);
    } else {
      setSelectedGroup(null);
    }
  };

  const handleCreateGroup = async () => {
    const group: GroupDTO = { groupName: "Kanban", projectId: selectedProject!.projectId };

    const createdGroup = await createGroup(group);
    setGroups([...groups, createdGroup]);

    setSelectedGroup(createdGroup);
    handleGroupChange(createdGroup);
  };

  const handleCreateTask = async () => {
    if (selectedGroup === null) {
      toast.error("Por favor, selecione um grupo");
      return;
    }
    const task: TaskDTO = {
      assignedTo: null,
      taskName: "Criar Tarefa",
      groupId: selectedGroup.groupId,
      status: TaskDtoStatusEnum.TODO,
    };

    const createdTask = await createTask(task);
    setTasks((prevColumns) => {
      const columnKey = `column-1`;
      return {
        ...prevColumns,
        [columnKey]: {
          ...prevColumns[columnKey],
          items: [...prevColumns[columnKey].items, createdTask],
        },
      };
    });
  };

  //Project
  const handleCreateProject = async () => {
    const project: ProjectDTO = {
      projectName: "Novo projeto",
    };

    const createdProject = await createProject(project);
    setProjects((prevProjects) => {
      return [...prevProjects, createdProject];
    });
  };

  const handleRenameProject = async (project: ProjectDTO, newName: string) => {
    project = { ...project, projectName: newName };
    await updateProject(project.projectId!, project);

    const updatedProjects = projects.map((p) =>
      p.projectId === project.projectId ? { ...p, projectName: newName } : p
    );
    setProjects(updatedProjects);

    setSelectedProject({ ...project, projectName: newName });
  };

  const handleDeleteProject = async (projectId: number) => {
    await deleteProject(projectId);
    const updatedProjects = projects.filter((project) => project.projectId !== projectId);
    setProjects(updatedProjects);

    if (updatedProjects.length > 0) {
      const nextProject = updatedProjects[0];
      handleProjectChange(nextProject);
    } else {
      setSelectedProject(null);
    }
  };

  const handleProjectChange = async (project: ProjectDTO) => {
    setSelectedProject(project);

    try {
      const fetchedGroups = await fetchAllGroups(project.projectId!);
      setGroups(fetchedGroups);

      if (fetchedGroups.length > 0) {
        const firstGroup = fetchedGroups[0];
        setSelectedGroup(firstGroup);
        await fetchTasksForGroup(firstGroup.groupId!);
      } else {
        setSelectedGroup(null);
        setTasks({
          "column-1": { title: "A Fazer", items: [] },
          "column-2": { title: "Em Andamento", items: [] },
          "column-3": { title: "Concluído", items: [] },
        });
      }
      const usersOnGroup = await getUsersOnProject(project.projectId!);
      setProjectUsers(usersOnGroup);
    } catch (error) {
      console.error("Erro ao resgatar projetos:", error);
    }
  };

  const handleSendInvite = async (email: string) => {
    const projectInvite: ProjectInviteRequest = {
      email: email,
      projectId: selectedProject?.projectId,
    };
    await sendEmailInvitation(projectInvite);
  };

  const handleExitProject = async (projectId: number) => {
    await exitProject(projectId);
    const updatedProjects = projects.filter((project) => project.projectId !== projectId);
    setProjects(updatedProjects);

    if (updatedProjects.length > 0) {
      const nextProject = updatedProjects[0];
      handleProjectChange(nextProject);
    } else {
      setSelectedProject(null);
    }
  };

  const taskEditRef = useRef(null);

  const closeDialog = async () => {
    if (taskEditRef.current) {
      const current = taskEditRef.current as any;
      if (current.isTaskUpdated) {
        const updatedTask = current.handleUpdateTask() as TaskDTO;
        await updateTask(updatedTask);
        if (selectedGroup) {
          await fetchTasksForGroup(selectedGroup.groupId!);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-color">
      <nav className="p-1 w-full flex justify-between items-center">
        <div>
          <div className="h-auto ml-10 flex flex-row gap-2 items-center">
            <img src={logoImage} alt="" className="w-6" />
            <h1 className="text-dark-black font-bold text-xl">Cortex</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 pr-4 py-1">
          <img src={UserIcon} alt="" className="w-8 h-8 rounded-full" />
        </div>
      </nav>

      <div className="flex flex-1 gap-5">
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={handleProjectChange}
          onCreateProject={handleCreateProject}
          onDeleteProject={handleDeleteProject}
          onRenameProject={handleRenameProject}
          onExitProject={handleExitProject}
        />

        <div className="flex-1 flex flex-col rounded bg-white">
          <header className="pt-5 px-9 w-full flex flex-row justify-between">
            <h2 className="text-2xl font-semibold text-dark-black">
              {selectedProject?.projectName}
            </h2>
            <InviteItem sendEmail={handleSendInvite} />
          </header>

          <div className="w-full mt-4 px-8 bg-white">
            <div className="flex flex-row h-8 gap-5">
              <GroupParentItem handleCreateGroup={handleCreateGroup} selectedGroup={selectedGroup}>
                {groups.map((group) => {
                  return (
                    <GroupItem
                      key={group.groupId}
                      group={group}
                      onGroupChange={handleGroupChange}
                      onRenameGroup={handleRenameGroup}
                      onDeleteGroup={handleDeleteGroup}
                    />
                  );
                })}
              </GroupParentItem>

              <div className="">
                <Button
                  onClick={handleCreateTask}
                  className="!w-auto px-5 h-full !rounded-[4px] flex items-center"
                  title="Criar Tarefa"
                />
              </div>
            </div>
            <div className="p-7">
              {[tasks].map((item) => (
                <div key={Object.keys(item)[0]} className={`text-gray-800`}>
                  <div className="p-4 flex flex-row">
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
                      {tasks === null ? (
                        <h1>Não há tarefas</h1>
                      ) : (
                        Object.entries(tasks).map(([id, column]) => {
                          const columnTitle = column?.title || "Default Title";
                          const columnItems = column?.items || [];

                          return (
                            <Droppable key={id} droppableId={id}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="min-h-[100px] pb-4 flex flex-col bg-gray-100 w-[280px] rounded-md items-center mr-4"
                                >
                                  <div
                                    className={`${getColumnStatusColor(
                                      columnTitle
                                    )} w-full rounded-t-md h-10`}
                                  >
                                    <h1 className="m-2 text-white font-semibold">
                                      {columnTitle} / {columnItems.length}
                                    </h1>
                                  </div>
                                  {columnItems.map((item, index) => (
                                    <Dialog.Root
                                      key={item.taskId}
                                      onOpenChange={(isOpen) => {
                                        if (!isOpen) {
                                          closeDialog();
                                        }
                                      }}
                                    >
                                      <Dialog.Trigger className="justify-start flex w-full px-4">
                                        <TaskCard item={item} index={index} />
                                      </Dialog.Trigger>

                                      <Dialog.Portal>
                                        <Dialog.Overlay className="fixed bg-black/40 backdrop-blur-sm inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                                        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[100vh] h-[825px] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                                          <VisuallyHidden>
                                            <Dialog.Title />
                                          </VisuallyHidden>

                                          <TaskEditContent
                                            ref={taskEditRef}
                                            task={item}
                                            groups={groups}
                                            selectedGroup={selectedGroup!}
                                            projectUsers={projectUsers}
                                            projectName={selectedProject!.projectName!}
                                          />
                                        </Dialog.Content>
                                      </Dialog.Portal>
                                    </Dialog.Root>
                                  ))}
                                </div>
                              )}
                            </Droppable>
                          );
                        })
                      )}
                    </DragDropContext>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
