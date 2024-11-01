import * as Popover from "@radix-ui/react-popover";
import FeatherIcon from "feather-icons-react";
import { default as UserIcon } from "../assets/usericon.svg";
import { motion } from "framer-motion";
import { scaleAnimation } from "../utils/animation";
import { UserDTO } from "../types/Api";

interface AssignerItemInterface {
  projectUsers: UserDTO[];
  setSelectedTaskUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
  selectedTaskUser: UserDTO | null;
}

function AssignerTask({
  projectUsers,
  selectedTaskUser,
  setSelectedTaskUser,
}: Readonly<AssignerItemInterface>) {
  return (
    <div className="flex flex-row items-center gap-24 w-full">
      <div className="flex flex-row gap-2 items-center">
        <FeatherIcon icon="users" size={17} />
        <h1 className="w-10">Responsável</h1>
      </div>
      <Popover.Root>
        <Popover.Trigger className="w-full">
          <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
            <div className="w-full flex justify-center">
              {selectedTaskUser !== null ? (
                <div className="w-full flex justify-center gap-2 items-center">
                  <img alt="" className="flex justify-center items-center" src={UserIcon} />
                  <h1>{selectedTaskUser?.username}</h1>
                </div>
              ) : null}
            </div>
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
                  {projectUsers
                    .filter((user) => user.userId !== selectedTaskUser?.userId)
                    .map((item) => {
                      return (
                        <Popover.Close key={item.userId} asChild>
                          <button
                            className="w-full flex rounded-md items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setSelectedTaskUser(item)}
                          >
                            <img
                              alt=""
                              className="flex justify-center items-center mr-2"
                              src={UserIcon}
                            />
                            {item.username}
                          </button>
                        </Popover.Close>
                      );
                    })}
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

export default AssignerTask;
