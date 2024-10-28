/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import logoImage from "../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import { default as UserIcon } from "../assets/usericon.svg";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "../components/TaskCard/TaskCard";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { scaleAnimation, slideAnimation } from "../utils/animation";
import { motion } from "framer-motion";
import Button from "../components/Button/Button";
import Calendar from "react-calendar";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { fetchAllProjects } from "../lib/services/projectService";
import { ProjectDTO } from "../types/Api";
interface ProjectInterface {
  id: number;
  title: string;
}

const mockedProjects = [
  {
    id: 1,
    title: "teste",
  },
  {
    id: 2,
    title: "teste2",
  },
];

const tabs = [
  { aKey: "tab1", title: "Tab 1", content: "This is the content for Tab 1." },
  { aKey: "tab2", title: "Tab 2", content: "This is the content for Tab 2." },
  { aKey: "tab3", title: "Tab 3", content: "This is the content for Tab 3." },
];

const data = [
  {
    id: "1",
    Task: "Lorem ipsum dolor sit amet",
    Assigned_To: "Beltran",
    Priority: "Low",
    Due_Date: "25-May-2020",
    status: "Feito",
    Description: "This is a detailed description of the task that explains what needs to be done.",
  },
  {
    id: "2",
    Task: "Fix Styling",
    Assigned_To: "Dave",
    Priority: "Low",
    Due_Date: "26-May-2020",
    status: "Feito",
    Description: "This is a detailed description of the task that explains what needs to be done.",
  },
  {
    id: "3",
    Task: "Handle Door Specs",
    Assigned_To: "Roman",
    Priority: "Medium",
    Due_Date: "27-May-2020",
    status: "In Progress",
    Description: "This is a detailed description of the task that explains what needs to be done.",
  },
  {
    id: "4",
    Task: "morbi",
    Assigned_To: "Gawen",
    Priority: "High",
    Due_Date: "23-Aug-2020",
    status: "Done",
    Description: "This is a detailed description of the task that explains what needs to be done.",
  },
  {
    id: "5",
    Task: "proin",
    Assigned_To: "Bondon",
    Priority: "Medium",
    Due_Date: "05-Jan-2021",
    status: "Feito",
    Description: "This is a detailed description of the task that explains what needs to be done.",
  },
];

export const columnsFromBackend = {
  "column-1": {
    title: "Feito",
    items: data.filter((item) => item.status === "Feito"),
  },
  "column-2": {
    title: "In Progress",
    items: data.filter((item) => item.status === "In Progress"),
  },
  "column-3": {
    title: "Done",
    items: data.filter((item) => item.status === "Done"),
  },
};

function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  //
  const [key, setKey] = useState<string>(tabs[0].aKey);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [selectedGroup, setSelectedGroup] = useState("Kanban"); // state for the selected option

  const retrieveAndSelectFirstProject = async () => {
    try {
      const projects = await fetchAllProjects();
      if (projects.length > 0) {
        setProjects(projects);
        setSelectedProject(projects[0]);
      }
    } catch (error) {
      console.error("Failed to retrieve projects");
    }
  };

  useEffect(() => {
    retrieveAndSelectFirstProject();
  }, []);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      // Atualiza o status da tarefa removida para o novo quadro
      removed.status = destColumn.title;

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

  const [taskName, setTaskName] = useState<string>("Criar Tarefa");

  return (
    <div className="min-h-screen flex flex-col bg-background-color">
      <nav className="p-1 w-full flex justify-between items-center">
        <div>
          <div className="h-auto ml-10 flex flex-row gap-2 items-center">
            <img src={logoImage} alt="" className="w-6" />
            <h1 className="text-dark-black font-bold text-xl">Cortex</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </nav>

      <div className="flex flex-1 gap-5">
        {/* Sidebar */}
        <aside className="w-64 pl-4 pr-2 py-4 rounded-e-lg bg-white">
          <div className="flex flex-row gap-2 justify-start">
            <div className="flex rounded-md justify-center text-sm items-center w-5 h-5 bg-primary-color bg-opacity-70 aspect-square font-bold text-white">
              <span className="">Á</span>
            </div>
            <h2 className="text-base font-bold mb-4 text-dark-black">Área de trabalho</h2>
          </div>
          <ul>
            {projects.map((item) => {
              return (
                <li key={item.projectId} className="mb-2">
                  <div
                    role="presentation"
                    onClick={() => setSelectedProject(item)}
                    className={`cursor-pointer items-center flex flex-row gap-2 text-dark-black p-[7px] ${
                      selectedProject == item ? "bg-primary-color" : "bg-transparent"
                    }  bg-opacity-15 rounded-[4px]`}
                  >
                    <FeatherIcon icon="sidebar" size={18} />
                    <h1 className="font-medium text-sm">{item.projectName}</h1>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col rounded bg-white">
          <header className="pt-5 px-9 w-full flex flex-row justify-between">
            <h2 className="text-2xl font-semibold text-dark-black">
              {selectedProject?.projectName}
            </h2>
            <Button
              className="!w-auto rounded-[4px] px-4"
              hasBackground={false}
              title="Convidar / 1"
            />
          </header>

          <div className="w-full mt-4 px-8 bg-white">
            {/**\aaaaaaa */}
            <div className="flex flex-row h-8 gap-5">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <div className="cursor-pointer w-[160px] flex flex-row justify-between px-2 py-[5px] bg-white border border-gray-300 rounded-[4px] shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    <div className="w-full flex items-center">
                      <FeatherIcon icon="bar-chart" size={15} className="mr-2" />
                      {selectedGroup}
                    </div>
                    <FeatherIcon icon="chevron-down" size={15} className="ml-2" />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content sideOffset={0} align="start">
                    <motion.div
                      className="z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={scaleAnimation}
                    >
                      <div className="p-2">
                        <div className="">
                          <Popover.Close asChild>
                            <button
                              className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setSelectedGroup("Padrão")}
                            >
                              <FeatherIcon icon="home" size={15} className="mr-2" />
                              Padrão
                            </button>
                          </Popover.Close>
                          <Popover.Close asChild>
                            <button
                              className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setSelectedGroup("Kanban")}
                            >
                              <FeatherIcon icon="bar-chart" size={15} className="mr-2" />
                              Kanban
                            </button>
                          </Popover.Close>
                        </div>
                      </div>
                      <Popover.Arrow className="fill-current text-gray-200" />
                    </motion.div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              <div className="">
                <Button
                  className="!w-auto px-5 h-full !rounded-[4px] flex items-center"
                  title="Criar Tarefa"
                />
              </div>
            </div>
            <div className="p-7">
              {tabs.map((item) => (
                <div
                  key={item.aKey}
                  className={`text-gray-800 ${key === item.aKey ? "block" : "hidden"}`}
                >
                  <div className="p-4 flex flex-row">
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                      {Object.entries(columns).map(([columnId, column]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="min-h-[100px] pb-4 flex flex-col bg-gray-100 w-[280px] rounded-md items-center mr-4"
                            >
                              <div
                                className={`${
                                  column.title == "Feito"
                                    ? "bg-green-color"
                                    : column.title == "In Progress"
                                    ? "bg-yellow-color"
                                    : "bg-red-color"
                                } w-full rounded-t-md h-10`}
                              >
                                <h1 className="m-2 text-white font-semibold">{column.title} / 1</h1>
                              </div>
                              {column.items.map((item, index) => (
                                <Dialog.Root key={item.id}>
                                  <Dialog.Trigger className="justify-start flex w-full px-4">
                                    <TaskCard item={item} index={index} />
                                  </Dialog.Trigger>

                                  <Dialog.Portal>
                                    <Dialog.Overlay className="fixed bg-black/40 backdrop-blur-sm inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                                    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[100vh] h-[825px] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                                      <div className="flex h-full flex-row">
                                        <div className="flex flex-col gap-3">
                                          <h1 className="text-dark-black font-bold text-3xl">
                                            {item.Task}
                                          </h1>
                                          <div className=" min-w-[512px] flex flex-col gap-10 text-dark-black px-1">
                                            <div className="flex flex-row gap-2 items-center">
                                              in{" "}
                                              <span>
                                                <FeatherIcon icon="arrow-right" size={15} />
                                              </span>
                                              {item.Task}
                                            </div>
                                            <div className="flex flex-col gap-3">
                                              {/* Grupo */}
                                              <Popover.Root>
                                                <Popover.Trigger>
                                                  <div className="flex flex-row items-center gap-24">
                                                    <div className="flex flex-row gap-2 items-center">
                                                      <FeatherIcon icon="circle" size={17} />
                                                      <h1 className="w-10">Grupo</h1>
                                                    </div>
                                                    <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
                                                      <div className="rounded-full w-2 h-2 aspect-square bg-black ml-2"></div>
                                                      <h1 className="px-2 text-dark-black text-base font-medium">
                                                        Grupo1
                                                      </h1>
                                                    </div>
                                                  </div>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                  <Popover.Content
                                                    className="-mr-36"
                                                    align="center"
                                                  >
                                                    <motion.div
                                                      className="z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
                                                      initial="hidden"
                                                      animate="visible"
                                                      exit="exit"
                                                      variants={scaleAnimation} // You can switch to slideAnimation if you prefer sliding
                                                    >
                                                      <div className="p-2">
                                                        <div className="">
                                                          <Popover.Close asChild>
                                                            <button
                                                              className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                              onClick={() =>
                                                                setSelectedGroup("Padrão")
                                                              }
                                                            >
                                                              <FeatherIcon
                                                                icon="home"
                                                                size={15}
                                                                className="mr-2"
                                                              />
                                                              Padrão
                                                            </button>
                                                          </Popover.Close>
                                                          <Popover.Close asChild>
                                                            <button
                                                              className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                              onClick={() =>
                                                                setSelectedGroup("Kanban")
                                                              }
                                                            >
                                                              <FeatherIcon
                                                                icon="bar-chart"
                                                                size={15}
                                                                className="mr-2"
                                                              />
                                                              Kanban
                                                            </button>
                                                          </Popover.Close>
                                                        </div>
                                                      </div>
                                                      <Popover.Arrow className="fill-current text-gray-200" />
                                                    </motion.div>
                                                  </Popover.Content>
                                                </Popover.Portal>
                                              </Popover.Root>
                                              {/* Nomear */}
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
                                              {/* Responsável */}
                                              <Popover.Root>
                                                <Popover.Trigger>
                                                  <div className="flex flex-row items-center gap-24">
                                                    <div className="flex flex-row gap-2 items-center">
                                                      <FeatherIcon icon="users" size={17} />
                                                      <h1 className="w-10">Responsável</h1>
                                                    </div>
                                                    <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
                                                      <div className="w-full flex justify-center">
                                                        <img
                                                          className="flex justify-center items-center"
                                                          src={UserIcon}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                  <Popover.Content
                                                    className="-mr-36"
                                                    align="center"
                                                  >
                                                    <motion.div
                                                      className="z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
                                                      initial="hidden"
                                                      animate="visible"
                                                      exit="exit"
                                                      variants={scaleAnimation} // You can switch to slideAnimation if you prefer sliding
                                                    >
                                                      <div className="p-2">
                                                        <div className="">
                                                          <Popover.Close asChild>
                                                            <button
                                                              className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                              onClick={() =>
                                                                setSelectedGroup("Padrão")
                                                              }
                                                            >
                                                              <img
                                                                className="flex justify-center items-center mr-2"
                                                                src={UserIcon}
                                                              />
                                                              Thigas
                                                            </button>
                                                          </Popover.Close>
                                                          <Popover.Close asChild>
                                                            <button
                                                              className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                              onClick={() =>
                                                                setSelectedGroup("Kanban")
                                                              }
                                                            >
                                                              <img
                                                                className="flex justify-center items-center mr-2"
                                                                src={UserIcon}
                                                              />
                                                              Gustavo
                                                            </button>
                                                          </Popover.Close>
                                                        </div>
                                                      </div>
                                                      <Popover.Arrow className="fill-current text-gray-200" />
                                                    </motion.div>
                                                  </Popover.Content>
                                                </Popover.Portal>
                                              </Popover.Root>
                                              <Popover.Root>
                                                <Popover.Trigger>
                                                  <div className="flex flex-row items-center gap-24">
                                                    <div className="flex flex-row gap-2 items-center">
                                                      <FeatherIcon icon="align-justify" size={17} />
                                                      <h1 className="w-10">Status</h1>
                                                    </div>
                                                    <div
                                                      className={` flex-1 ${
                                                        true
                                                          ? "bg-green-color"
                                                          : item.status === "In Progress"
                                                          ? "bg-yellow-color"
                                                          : item.status === "Done"
                                                          ? "bg-red-color"
                                                          : ""
                                                      } justify-center h-[40px] mr-6 rounded-[1px] items-center flex`}
                                                    >
                                                      <h1 className=" px-2 text-white text-base font-medium">
                                                        Feito
                                                      </h1>
                                                    </div>
                                                  </div>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                  <Popover.Content
                                                    className="-mr-36"
                                                    align="center"
                                                  >
                                                    <motion.div
                                                      className="z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
                                                      initial="hidden"
                                                      animate="visible"
                                                      exit="exit"
                                                      variants={scaleAnimation}
                                                    >
                                                      <div className="p-2">
                                                        <div className="flex gap-2 flex-col">
                                                          <Popover.Close asChild>
                                                            <button
                                                              className="w-full justify-center text-white font-medium bg-yellow-color flex rounded-sm items-center px-4 py-2 text-sm hover:opacity-90"
                                                              onClick={() =>
                                                                setSelectedGroup("Padrão")
                                                              }
                                                            >
                                                              Em andamento
                                                            </button>
                                                          </Popover.Close>
                                                          <Popover.Close asChild>
                                                            <button
                                                              className="w-full justify-center text-white font-medium bg-red-color flex rounded-sm items-center px-4 py-2 text-sm hover:opacity-90"
                                                              onClick={() =>
                                                                setSelectedGroup("Padrão")
                                                              }
                                                            >
                                                              Parado
                                                            </button>
                                                          </Popover.Close>
                                                        </div>
                                                      </div>
                                                      <Popover.Arrow className="fill-current text-gray-200" />
                                                    </motion.div>
                                                  </Popover.Content>
                                                </Popover.Portal>
                                              </Popover.Root>
                                              {/* Data */}
                                              <Popover.Root>
                                                <Popover.Trigger>
                                                  <div className="flex flex-row items-center gap-24">
                                                    <div className="flex flex-row gap-2 items-center">
                                                      <FeatherIcon icon="calendar" size={17} />
                                                      <h1 className="w-10">Data</h1>
                                                    </div>
                                                    <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
                                                      <FeatherIcon
                                                        icon="circle"
                                                        size={15}
                                                        className="absolute ml-2 text-light-grey"
                                                      />
                                                      <h1 className="items-center justify-center flex w-full px-2 text-dark-black text-sm font-medium">
                                                        31 out
                                                      </h1>
                                                    </div>
                                                  </div>
                                                </Popover.Trigger>
                                                <Popover.Portal>
                                                  <Popover.Content
                                                    className="-mr-36"
                                                    align="center"
                                                  >
                                                    <motion.div
                                                      className="z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2"
                                                      initial="hidden"
                                                      animate="visible"
                                                      exit="exit"
                                                      variants={scaleAnimation}
                                                    >
                                                      <div className="p-2">
                                                        <div className="">
                                                          <Popover.Close asChild>
                                                            <LocalizationProvider
                                                              dateAdapter={AdapterDayjs}
                                                            >
                                                              <DateCalendar className="text-dark-black" />
                                                            </LocalizationProvider>
                                                          </Popover.Close>
                                                        </div>
                                                      </div>
                                                      <Popover.Arrow className="fill-current text-gray-200" />
                                                    </motion.div>
                                                  </Popover.Content>
                                                </Popover.Portal>
                                              </Popover.Root>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="w-[2px] h-[100%] bg-background-color  ">
                                          .
                                        </div>

                                        <div className="flex flex-col gap-10 ml-[50px] flex-1 pt-[56px] min-w-[490px]">
                                          <div>
                                            <textarea
                                              placeholder="Escreva uma atualização"
                                              id="autoExpandTextarea"
                                              className="w-full border-[2px] bg-transparent border-background-color rounded-md p-2 text-gray-900 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
                                              rows={1}
                                              onInput={(event) => {
                                                const textarea =
                                                  event.target as HTMLTextAreaElement;
                                                textarea.style.height = "auto";
                                                const maxRows = 3;
                                                const lineHeight = 24;
                                                const maxHeight = lineHeight * maxRows;
                                                textarea.style.height = `${Math.min(
                                                  textarea.scrollHeight,
                                                  maxHeight
                                                )}px`;
                                              }}
                                            ></textarea>
                                          </div>
                                          <div className="justify-start p-4 items-start flex-row rounded-md flex border-[2px] min-h-[135px] h-auto border-background-color">
                                            <div className="flex flex-col gap-4">
                                              <div className="flex items-center gap-3">
                                                <img
                                                  src={UserIcon}
                                                  className="w-10 aspect-square"
                                                />
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
                                    </Dialog.Content>
                                  </Dialog.Portal>
                                </Dialog.Root>
                              ))}
                            </div>
                          )}
                        </Droppable>
                      ))}
                    </DragDropContext>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kanban Board */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
