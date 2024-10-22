/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import logoImage from "../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import Button from "../components/Button/Button";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TaskCard from "../components/TaskCard/TaskCard";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Transitions } from "../utils/Transitions";
import { scaleAnimation, slideAnimation } from "../utils/animation";
import { motion } from "framer-motion";
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
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
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
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(mockedProjects[0]);
  const [key, setKey] = useState<string>(tabs[0].aKey);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [selectedGroup, setSelectedGroup] = useState("Kanban"); // state for the selected option

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
            {mockedProjects.map((item) => {
              return (
                <li key={item.id} className="mb-2">
                  <div
                    role="presentation"
                    onClick={() => setSelectedProject(item)}
                    className={`cursor-pointer items-center flex flex-row gap-2 text-dark-black p-[7px] ${
                      selectedProject == item ? "bg-primary-color" : "bg-transparent"
                    }  bg-opacity-15 rounded-[4px]`}
                  >
                    <FeatherIcon icon="sidebar" size={18} />
                    <h1 className="font-medium text-sm">{item.title}</h1>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col rounded bg-white">
          <header className="pt-5 px-9 w-full flex flex-row justify-between">
            <h2 className="text-2xl font-semibold text-dark-black">{selectedProject.title}</h2>
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
                      variants={scaleAnimation} // You can switch to slideAnimation if you prefer sliding
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
                              className="min-h-[100px] flex flex-col bg-gray-100 min-w-[341px] rounded-md p-4 mr-11"
                            >
                              <h1>{column.title}</h1>
                              {column.items.map((item, index) => (
                                <Dialog.Root key={item.id}>
                                  <Dialog.Trigger>
                                    <TaskCard item={item} index={index} />
                                  </Dialog.Trigger>

                                  <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                                    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                                      <Dialog.Title className="text-gray-800 text-2xl font-bold mb-4">
                                        Edit Task
                                      </Dialog.Title>

                                      <div className="flex flex-col space-y-4">
                                        <div>
                                          <label className="block text-gray-600">Task</label>
                                          <input
                                            type="text"
                                            name="Task"
                                            value={item.Task}
                                            onChange={() => {}}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-gray-600">Assigned To</label>
                                          <input
                                            type="text"
                                            name="Assigned_To"
                                            value={item.Assigned_To}
                                            onChange={() => {}}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-gray-600">Priority</label>
                                          <select
                                            name="Priority"
                                            value={item.Priority}
                                            onChange={() => {}}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                          >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                          </select>
                                        </div>
                                        <div>
                                          <label className="block text-gray-600">Due Date</label>
                                          <input
                                            type="date"
                                            name="Due_Date"
                                            value={item.Due_Date.split("T")[0]} // Format the date for input
                                            className="w-full border border-gray-300 rounded-md p-2"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-gray-600">Description</label>
                                          <textarea
                                            name="Description"
                                            value={item.Description}
                                            rows={4}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex justify-between mt-6">
                                        <Dialog.Close asChild>
                                          <Button
                                            hasBackground={false}
                                            className="flex-1 mr-2"
                                            title="Cancel"
                                          />
                                        </Dialog.Close>
                                        <Button
                                          className="flex-1"
                                          title="Save"
                                          onClick={() => {}}
                                        />
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
