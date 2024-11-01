import FeatherIcon from "feather-icons-react";
import * as Popover from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import { scaleAnimation } from "../utils/animation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDate } from "../utils/dateUtils";
import dayjs from "dayjs";

interface DateTaskInterface {
  taskDate: Date;
  setTaskDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DateTask({ setTaskDate, taskDate }: Readonly<DateTaskInterface>) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <div className="flex flex-row items-center gap-24">
          <div className="flex flex-row gap-2 items-center">
            <FeatherIcon icon="calendar" size={17} />
            <h1 className="w-10">Data</h1>
          </div>
          <div className="flex-1 bg-grey-color h-[40px] mr-6 rounded-[1px] items-center flex">
            <FeatherIcon icon="circle" size={15} className="absolute ml-2 text-light-grey" />
            <h1 className="items-center justify-center flex w-full px-2 text-dark-black text-sm font-medium">
              {formatDate(taskDate)}
            </h1>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="-mr-36" align="center">
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={dayjs(taskDate)}
                      onChange={setTaskDate}
                      className="text-dark-black"
                    />
                  </LocalizationProvider>
                </Popover.Close>
              </div>
            </div>
            <Popover.Arrow className="fill-current text-gray-200" />
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default DateTask;
