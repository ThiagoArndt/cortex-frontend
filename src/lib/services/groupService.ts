import axiosInstance from "../axiosInstance";
import { GroupDTO } from "../../types/Api";

export const fetchAllGroups = async (projectId: number): Promise<GroupDTO[]> => {
  try {
    const response = await axiosInstance.get(`/api/groups/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao resgatar grupos", error);
    throw error;
  }
};

export const updateGroup = async (groupId: number, group: GroupDTO): Promise<GroupDTO> => {
  try {
    const response = await axiosInstance.put(`/api/groups/${groupId}`, group);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar grupo", error);
    throw error;
  }
};

export const deleteGroup = async (groupId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`/api/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar grupo", error);
    throw error;
  }
};

export const createGroup = async (group: GroupDTO): Promise<GroupDTO> => {
  try {
    const response = await axiosInstance.post(`/api/groups`, group);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar grupo", error);
    throw error;
  }
};
