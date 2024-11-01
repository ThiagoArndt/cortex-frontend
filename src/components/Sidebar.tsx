import { useState } from "react";
import { ProjectDTO } from "../types/Api";
import FeatherIcon from "feather-icons-react";
import * as Popover from "@radix-ui/react-popover";
import { scaleAnimation } from "../utils/animation";
import { motion } from "framer-motion";

interface SidebarInterface {
  projects: ProjectDTO[];
  setSelectedProject: (project: ProjectDTO) => Promise<void>;
  selectedProject: ProjectDTO | null;
  onCreateProject: () => void;
  onRenameProject: (project: ProjectDTO, newName: string) => void;
  onDeleteProject: (projectId: number) => void;
  onExitProject: (projectId: number) => void;
}

function Sidebar({
  projects,
  selectedProject,
  setSelectedProject,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  onExitProject,
}: Readonly<SidebarInterface>) {
  const [isEditing, setIsEditing] = useState(false);
  const [newProjectName, setNewProjectName] = useState(selectedProject?.projectName);

  const handleDeleteProject = () => {
    if (selectedProject) {
      onDeleteProject(selectedProject.projectId!);
    }
  };

  const handleSaveProjectName = () => {
    if (selectedProject) {
      onRenameProject(selectedProject, newProjectName!);
      setIsEditing(false);
    }
  };

  const handleCancelRename = () => {
    setIsEditing(false);
    setNewProjectName(selectedProject?.projectName);
  };

  const handleEditProject = () => {
    setIsEditing(true);
    setNewProjectName(selectedProject?.projectName);
  };

  const handleExitProject = () => {
    if (selectedProject) {
      onExitProject(selectedProject.projectId!);
    }
  };

  return (
    <aside className="w-64 pl-4 pr-2 pb-4 rounded-e-lg bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 justify-start mt-4">
          <div className="flex rounded-md justify-center text-sm items-center w-5 h-5 bg-primary-color bg-opacity-70 aspect-square font-bold text-white">
            <span className="">Á</span>
          </div>
          <h2 className="text-base font-bold mb-4 text-dark-black">Área de trabalho</h2>
        </div>
        <div
          onClick={onCreateProject}
          role="presentation"
          className="hover:bg-primary-color p-1 bottom-4 cursor-pointer flex items-center rounded-md hover:bg-opacity-40"
        >
          <FeatherIcon className="text-dark-grey font-medium" icon="plus" size={20} />
        </div>
      </div>
      <ul>
        {projects.map((item) => {
          return (
            <li key={item.projectId} className="mb-2">
              <div
                role="presentation"
                onClick={async () => await setSelectedProject(item)}
                className={`justify-between cursor-pointer items-center flex flex-row pr-4 text-dark-black p-[7px] ${
                  selectedProject == item ? "bg-primary-color" : "bg-transparent"
                }  bg-opacity-15 rounded-[4px]`}
              >
                <div className="flex flex-row gap-2">
                  <FeatherIcon icon="sidebar" size={18} />
                  {isEditing && selectedProject?.projectId === item.projectId ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="border-gray-300 h-[22px] rounded-md bg-transparent w-[130px] py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveProjectName();
                          } else if (e.key === "Escape") {
                            handleCancelRename();
                          }
                        }}
                        autoFocus
                      />
                    </div>
                  ) : (
                    item.projectName
                  )}
                </div>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <div
                      role="presentation"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-[2px] hover:bg-primary-color rounded-md hover:bg-opacity-40"
                    >
                      <FeatherIcon className="" icon="more-horizontal" size={15} />
                    </div>
                  </Popover.Trigger>
                  <Popover.Content sideOffset={10} align="end">
                    <motion.div
                      className="z-20 bg-white border absolute -left-36 border-gray-200 rounded-lg shadow-lg p-2 w-40"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={scaleAnimation}
                    >
                      <div className="flex flex-col">
                        <div
                          role="presentation"
                          className="flex flex-row text-gray-700 items-center w-full rounded-md  px-4 py-2 text-sm  hover:bg-gray-100"
                          onClick={handleEditProject}
                        >
                          <FeatherIcon icon="edit-2" size={15} className="mr-2 mb-[1px]" />
                          Renomear
                        </div>
                        <div
                          role="presentation"
                          onClick={handleDeleteProject}
                          className="flex font-medium flex-row text-red-700 items-center w-full rounded-md  px-4 py-2 text-sm  hover:bg-gray-100"
                        >
                          <FeatherIcon icon="trash-2" size={15} className="mr-2 mb-[1px]" />
                          Excluir
                        </div>
                        <div
                          role="presentation"
                          onClick={handleExitProject}
                          className="flex font-medium flex-row text-red-700 items-center w-full rounded-md  px-4 py-2 text-sm  hover:bg-gray-100"
                        >
                          <FeatherIcon icon="log-out" size={15} className="mr-2 mb-[1px]" />
                          Sair
                        </div>
                      </div>
                    </motion.div>
                  </Popover.Content>
                </Popover.Root>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
