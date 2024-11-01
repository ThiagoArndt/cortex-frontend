import * as Popover from "@radix-ui/react-popover";
import Button from "./Button";
import { motion } from "framer-motion";
import { scaleAnimation } from "../utils/animation";
import { Input } from "./Input";
import { useState } from "react";
import toast from "react-hot-toast";

interface InviteItemInterface {
  sendEmail: (email: string) => Promise<void>;
}

function InviteItem({ sendEmail }: Readonly<InviteItemInterface>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handleSendEmail = async (email: string) => {
    try {
      setIsLoading(true);
      await sendEmail(email);
      toast.success("Convite enviado com sucesso!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button className="!w-auto rounded-[4px] px-4" hasBackground={false} title="Convidar" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} align="end">
          <motion.div
            className="flex flex-col gap-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={scaleAnimation}
          >
            <Input.Root>
              <Input.Text
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cortex@gmail.com"
              />
            </Input.Root>
            <div className="flex flex-row-reverse gap-2 h-8">
              {!isLoading ? (
                <Button onClick={() => handleSendEmail(email)} title="Enviar" />
              ) : (
                <h1 className="text-dark-grey">Enviando...</h1>
              )}

              <div className="w-[400px]"></div>
            </div>
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default InviteItem;
