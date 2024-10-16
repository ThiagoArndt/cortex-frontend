import { ReactNode } from "react";

interface InputRootProps {
  children: ReactNode;
}
function InputRoot({ children }: Readonly<InputRootProps>) {
  return <div className="w-full">{children}</div>;
}

export default InputRoot;
