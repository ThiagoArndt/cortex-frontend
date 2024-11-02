import logoImage from "../assets/logo.png";
import { default as UserIcon } from "../assets/usericon.svg";
import * as Popover from "@radix-ui/react-popover";
import { scaleAnimation } from "../utils/animation";
import { motion } from "framer-motion";
import FeatherIcon from "feather-icons-react";
import { useAuth } from "../providers/authProvider";

function Navbar() {
  const { logOut } = useAuth();

  return (
    <nav className="p-1 w-full flex justify-between items-center">
      <div>
        <div className="h-auto ml-10 flex flex-row gap-2 items-center">
          <img src={logoImage} alt="" className="w-6" />
          <h1 className="text-dark-black font-bold text-xl">Cortex</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4 pr-4 py-1">
        <Popover.Root>
          <Popover.Trigger>
            <img src={UserIcon} alt="" className="w-8 h-8 rounded-full" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className=" absolute right-10 -top-9" align="end">
              <motion.div
                className="z-20 w-24 bg-white border border-gray-200 rounded-lg shadow-lg p-1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={scaleAnimation}
              >
                <Popover.Close asChild>
                  <button
                    className="gap-2 flex rounded-md items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={logOut}
                  >
                    <FeatherIcon size={20} icon="log-out" className="text-red-700" />
                    <span className="text-red-700">Sair</span>
                  </button>
                </Popover.Close>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </nav>
  );
}

export default Navbar;
