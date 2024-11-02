import axiosInstance from "../axiosInstance";
import { TaskRequest, TaskResponse } from "../../types/Api";

export const fetchAllTasks = async (groupId: number): Promise<TaskResponse[]> => {
  try {
    const response = await axiosInstance.get(`/api/tasks/group/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao resgatar tarefas", error);
    throw error;
  }
};

export const updateTask = async (data: TaskRequest): Promise<TaskResponse> => {
  try {
    const response = await axiosInstance.put(`/api/tasks/${data.taskId!}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa", error);
    throw error;
  }
};

export const createTask = async (data: TaskResponse): Promise<TaskResponse> => {
  try {
    const response = await axiosInstance.post(`/api/tasks`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa", error);
    throw error;
  }
};
