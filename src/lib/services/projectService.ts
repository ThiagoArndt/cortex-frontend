import axiosInstance from "../axiosInstance";
import { ProjectDTO, UserDTO } from "../../types/Api";

export const fetchAllProjects = async (): Promise<ProjectDTO[]> => {
  try {
    const response = await axiosInstance.get("/api/projects");
    return response.data;
  } catch (error) {
    console.error("Erro ao resgatar projetos", error);
    throw error;
  }
};

export const createProject = async (project: ProjectDTO): Promise<ProjectDTO> => {
  try {
    const response = await axiosInstance.post(`/api/projects`, project);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar projeto", error);
    throw error;
  }
};

export const updateProject = async (
  projectId: number,
  project: ProjectDTO
): Promise<ProjectDTO> => {
  try {
    const response = await axiosInstance.put(`/api/projects/${projectId}`, project);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar projeto", error);
    throw error;
  }
};

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/api/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar projeto", error);
    throw error;
  }
};

export const getUsersOnProject = async (projectId: number): Promise<UserDTO[]> => {
  try {
    const response = await axiosInstance.get(`/api/projects/${projectId}/users`);
    return response.data;
  } catch (error) {
    console.error("Erro ao resgatar projetos", error);
    throw error;
  }
};

export const exitProject = async (projectId: number): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/api/projects/exit/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao sair do projeto", error);
    throw error;
  }
};
