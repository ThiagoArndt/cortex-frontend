import * as Popover from "@radix-ui/react-popover";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";
import { scaleAnimation } from "../utils/animation";
import { GroupDTO } from "../types/Api";

interface GroupTaskInterface {
  groups: GroupDTO[];
  setSelectedTaskGroup: React.Dispatch<React.SetStateAction<GroupDTO>>;
  selectedTaksGroup: GroupDTO;
}

function GroupTask({
  groups,
  selectedTaksGroup,
  setSelectedTaskGroup,
}: Readonly<GroupTaskInterface>) {
  return (
    <div className="flex flex-row items-center gap-24 w-full">
      <div className="flex flex-row gap-2 items-center">
        <FeatherIcon icon="circle" size={17} />
        <h1 className="w-10">Grupo</h1>
      </div>
      <Popover.Root>
        <Popover.Trigger className="w-full">
          <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
            <div className="rounded-full w-2 h-2 aspect-square bg-black ml-2"></div>
            <h1 className="px-2 text-dark-black text-base font-medium">
              {selectedTaksGroup.groupName}
            </h1>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="mr-6" align="center">
            <motion.div
              className="z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={scaleAnimation}
            >
              <div className="p-2">
                <div className="">
                  {groups
                    .filter((group) => group.groupId !== selectedTaksGroup?.groupId)
                    .map((group) => (
                      <Popover.Close key={group.groupId} asChild>
                        <button
                          className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedTaskGroup(group);
                          }}
                        >
                          <FeatherIcon icon="home" size={15} className="mr-2" />
                          {group.groupName}
                        </button>
                      </Popover.Close>
                    ))}
                </div>
              </div>
              <Popover.Arrow className="fill-current text-gray-200" />
            </motion.div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default GroupTask;
