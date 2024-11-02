import axiosInstance from "../axiosInstance";
import { GroupDTO, ProjectInviteRequest } from "../../types/Api";
import { AxiosResponse } from "axios";

export const fetchAllGroups = async (projectId: number): Promise<GroupDTO[]> => {
  try {
    const response = await axiosInstance.get(`/api/groups/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao resgatar grupos", error);
    throw error;
  }
};

export const acceptEmailInvitation = async (token: string): Promise<boolean> => {
  try {
    await axiosInstance.post(`/api/email/accept`, null, {
      params: { token: token },
    });
    return true;
  } catch (error) {
    console.error("Erro ao aceitar convite", error);
    throw new Error("Erro ao aceitar convite");
  }
};

export const sendEmailInvitation = async (
  projectInvite: ProjectInviteRequest
): Promise<AxiosResponse<unknown, unknown>> => {
  try {
    const response = await axiosInstance.post(`/api/email/invite`, projectInvite);
    return response;
  } catch (error) {
    console.error("Erro ao aceitar convite", error);
    throw new Error("Erro ao aceitar convite");
  }
};
