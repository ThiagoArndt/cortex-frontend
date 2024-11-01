import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import { GroupDTO } from "../types/Api";

interface GroupItemProps {
  group: GroupDTO;
  onGroupChange: (group: GroupDTO) => void;
  onRenameGroup: (group: GroupDTO, newName: string) => void;
  onDeleteGroup: (groupId: number) => void;
}

const scaleAnimation = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
};

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onGroupChange,
  onRenameGroup,
  onDeleteGroup,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGroupName, setNewGroupName] = useState(group.groupName);

  const handleGroupChange = () => {
    onGroupChange(group);
  };

  const handleDeleteGroup = () => {
    onDeleteGroup(group.groupId!);
  };

  const handleRenameGroup = () => {
    setIsEditing(true);
  };

  const handleSaveGroupName = () => {
    onRenameGroup(group, newGroupName!);
    setIsEditing(false);
  };

  const handleCancelRename = () => {
    setIsEditing(false);
    setNewGroupName(group.groupName);
  };

  return (
    <div key={group.groupId}>
      <div
        role="presentation"
        className="w-full justify-between flex rounded-md items-center px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
        onClick={handleGroupChange}
      >
        <div className="flex flex-row">
          <FeatherIcon icon="home" size={15} className="mr-2 mt-[1px]" />
          {isEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="border-gray-300 h-[22px] rounded-md bg-transparent w-[130px] py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-color"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveGroupName();
                  } else if (e.key === "Escape") {
                    handleCancelRename();
                  }
                }}
                autoFocus
              />
            </div>
          ) : (
            group.groupName
          )}
        </div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <div
              role="presentation"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="hover:bg-primary-color hover:bg-opacity-25 p-[2px] rounded-md"
            >
              <FeatherIcon className="" icon="more-horizontal" size={15} />
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
                <div className="flex flex-col">
                  <div
                    role="presentation"
                    className="flex flex-row text-gray-700 items-center w-full rounded-md  px-4 py-2 text-sm  hover:bg-gray-100"
                    onClick={handleRenameGroup}
                  >
                    <FeatherIcon icon="edit-2" size={15} className="mr-2 mb-[1px]" />
                    Renomear
                  </div>
                  <div
                    role="presentation"
                    onClick={handleDeleteGroup}
                    className="flex font-medium flex-row text-red-700 items-center w-full rounded-md  px-4 py-2 text-sm  hover:bg-gray-100"
                  >
                    <FeatherIcon icon="trash-2" size={15} className="mr-2 mb-[1px]" />
                    Excluir
                  </div>
                </div>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
};

export default GroupItem;
