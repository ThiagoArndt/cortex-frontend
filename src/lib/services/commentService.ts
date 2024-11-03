import { CommentRequest, CommentResponse } from "../../types/Api";
import axiosInstance from "../axiosInstance";

export const addComment = async (
  comment: CommentRequest,
  taskId: number
): Promise<CommentResponse> => {
  try {
    const response = await axiosInstance.post(`/api/comments/add-comment/${taskId}`, comment);
    return response.data;
  } catch (error) {
    console.error("Erro ao aceitar convite", error);
    throw new Error("Erro ao aceitar convite");
  }
};
