import * as Popover from "@radix-ui/react-popover";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";
import { scaleAnimation } from "../utils/animation";
import { getStatusColor } from "../utils/styleUtils";
import { TaskDtoStatusEnum } from "../types/Api";
import { STATUS_MAPPINGS } from "../utils/mappings";

interface StatusItemInterface {
  status: TaskDtoStatusEnum;
  setTaskStatus: React.Dispatch<React.SetStateAction<TaskDtoStatusEnum>>;
}

const ALL_STATUS: TaskDtoStatusEnum[] = [
  TaskDtoStatusEnum.TODO,
  TaskDtoStatusEnum.IN_PROGRESS,
  TaskDtoStatusEnum.DONE,
];

function StatusTask({ status, setTaskStatus }: Readonly<StatusItemInterface>) {
  return (
    <div className="flex flex-row items-center gap-24 w-full">
      <div className="flex flex-row gap-2 items-center">
        <FeatherIcon icon="align-justify" size={17} />
        <h1 className="w-10">Status</h1>
      </div>
      <Popover.Root>
        <Popover.Trigger className="w-full">
          <div
            className={` flex-1 ${getStatusColor(
              status
            )} justify-center h-[40px] mr-6 rounded-[1px] items-center flex`}
          >
            <h1 className="px-2 text-white text-base font-medium">{STATUS_MAPPINGS[status]}</h1>
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
                <div className="flex gap-2 flex-col">
                  {ALL_STATUS.filter((s) => s !== status).map((statusOption) => (
                    <Popover.Close asChild key={statusOption}>
                      <button
                        className={`w-full justify-center text-white font-medium ${getStatusColor(
                          statusOption
                        )} flex rounded-sm items-center px-4 py-2 text-sm hover:opacity-90`}
                        onClick={() => setTaskStatus(statusOption)}
                      >
                        {STATUS_MAPPINGS[statusOption]}
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

export default StatusTask;
