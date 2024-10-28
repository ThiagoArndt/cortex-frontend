import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "TODO":
      return "bg-yellow-500";
    case "IN_PROGRESS":
      return "bg-orange-500";
    case "DONE":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};
