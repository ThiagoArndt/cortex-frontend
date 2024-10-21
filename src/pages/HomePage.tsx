/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import logoImage from "../assets/logo.png";
import FeatherIcon from "feather-icons-react";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, arrayMove } from "@dnd-kit/sortable";
import Items from "../components/Item/Item";
import Container from "../components/Container/Container";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "../components/Column/Column";
import TaskCard from "../components/TaskCard/TaskCard";

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
    // Assigned_To: 'Beltran',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: "25-May-2020",
  },
  {
    id: "2",
    Task: "Fix Styling",
    // Assigned_To: 'Dave',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: "26-May-2020",
  },
  {
    id: "3",
    Task: "Handle Door Specs",
    // Assigned_To: 'Roman',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    Due_Date: "27-May-2020",
  },
  {
    id: "4",
    Task: "morbi",
    // Assigned_To: 'Gawen',
    // Assignee: 'Kai',
    // Status: 'Done',
    // Priority: 'High',
    Due_Date: "23-Aug-2020",
  },
  {
    id: "5",
    Task: "proin",
    // Assigned_To: 'Bondon',
    // Assignee: 'Antoinette',
    // Status: 'In Progress',
    // Priority: 'Medium',
    Due_Date: "05-Jan-2021",
  },
];

export const columnsFromBackend = {
  "column-1": {
    title: "To-do",
    items: data,
  },
  "column-2": {
    title: "In Progress",
    items: [],
  },
  "column-3": {
    title: "Done",
    items: [],
  },
};

function HomePage() {
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(mockedProjects[0]);
  const [key, setKey] = useState<string>(tabs[0].aKey);
  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
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
      <nav className="p-4 w-full flex justify-between items-center">
        <div>
          <div className="h-auto flex flex-row gap-5 items-center">
            <img src={logoImage} alt="" className="w-12" />
            <h1 className="text-dark-black font-bold text-3xl">Cortex</h1>
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
        <aside className="w-64 p-4 rounded-e-xl bg-white">
          <div className="flex flex-row gap-2 justify-start">
            <div className="flex rounded-md justify-center text-xl items-center w-7 h-7 bg-primary-color bg-opacity-70 aspect-square font-bold text-white">
              <span className="-mb-1">Á</span>
            </div>
            <h2 className="text-xl font-bold mb-4 text-dark-black">Área de trabalho</h2>
          </div>
          <ul>
            {mockedProjects.map((item) => {
              return (
                <li key={item.id} className="mb-2">
                  <div
                    role="presentation"
                    onClick={() => setSelectedProject(item)}
                    className={`cursor-pointer flex flex-row gap-2 text-dark-black p-2 ${
                      selectedProject == item ? "bg-primary-color" : "bg-transparent"
                    }  bg-opacity-15 rounded-lg`}
                  >
                    <FeatherIcon icon="sidebar" />
                    <h1 className="font-semibold">{item.title}</h1>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col rounded bg-white">
          {/* Title Above Board */}
          <header className="pt-8 pl-11">
            <h2 className="text-2xl font-semibold text-dark-black">{selectedProject.title}</h2>
          </header>

          <div className="mt-5 w-full px-8 bg-white">
            <div className="flex border-b items-center">
              {tabs.map((item) => (
                <div
                  role="presentation"
                  key={item.aKey}
                  className={`cursor-pointer mx-5 py-2 text-lg font-medium text-gray-700 ${
                    key === item.aKey
                      ? "border-b-2 border-primary-color text-black"
                      : "border-b-2 border-transparent hover:text-black hover:border-gray-300"
                  }`}
                  onClick={() => setKey(item.aKey)}
                >
                  {item.title}
                </div>
              ))}
              <h1 className="cursor-pointer ml-2 text-xl font-medium text-gray-700 hover:text-primary-color">
                +
              </h1>
            </div>
            <div className="mt-5">
              <Button className="!w-auto px-5 h-10 flex items-center" title="Criar Tarefa" />
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
                                <TaskCard key={item.id} item={item} index={index} />
                              ))}
                              {provided.placeholder}
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
