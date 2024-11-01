import * as Popover from "@radix-ui/react-popover";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";
import { scaleAnimation } from "../utils/animation";
import { GroupDTO } from "../types/Api";
import { ReactNode } from "react";

interface GroupParentItemInterface {
  selectedGroup: GroupDTO | null;
  children: ReactNode;
  handleCreateGroup: () => void;
}

function GroupParentItem({
  children,
  handleCreateGroup,
  selectedGroup,
}: Readonly<GroupParentItemInterface>) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="cursor-pointer w-[160px] flex flex-row justify-between px-2 py-[5px] bg-white border border-gray-300 rounded-[4px] shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <div className="w-full flex items-center">
            <FeatherIcon icon="bar-chart" size={15} className="mr-2" />
            {selectedGroup?.groupName}
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
            <div className="p-2 flex flex-col">
              {children}
              <div className="w-full h-[1px] bg-background-color"></div>
              <button
                onClick={handleCreateGroup}
                className="w-full gap-2 h-auto justify-center flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FeatherIcon icon="plus" size={15} />
                <h1 className="mt-[1px]">Adicionar Visualização</h1>
              </button>
            </div>
            <Popover.Arrow className="fill-current text-gray-200" />
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default GroupParentItem;
