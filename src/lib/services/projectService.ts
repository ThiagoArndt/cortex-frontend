import axiosInstance from "../axiosInstance";
import { ProjectDTO } from "../../types/Api";

export const fetchAllProjects = async (): Promise<ProjectDTO[]> => {
  try {
    const response = await axiosInstance.get("/api/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects", error);
    throw error;
  }
};
