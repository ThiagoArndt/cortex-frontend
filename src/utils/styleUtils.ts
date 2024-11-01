import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "TODO":
      return "bg-green-color";
    case "IN_PROGRESS":
      return "bg-yellow-color";
    case "DONE":
      return "bg-red-color";
    default:
      return "bg-gray-400";
  }
};

export const getColumnStatusColor = (status: string) => {
  switch (status) {
    case "A Fazer":
      return "bg-green-color";
    case "Em Andamento":
      return "bg-yellow-color";
    case "Concluído":
      return "bg-red-color";
    default:
      return "bg-gray-400";
  }
};
