/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TaskRequest {
  /** @format int32 */
  taskId?: number;
  taskName?: string;
  /** @format int32 */
  groupId?: number;
  /** @format int32 */
  assignedTo?: number | null;
  status?: TaskDtoStatusEnum;
  /** @format date */
  dueDate?: string;
}

export interface TaskResponse {
  /** @format int32 */
  taskId?: number;
  taskName?: string;
  /** @format int32 */
  groupId?: number;
  /** @format int32 */
  assignedTo?: UserDTO | null;
  status?: TaskDtoStatusEnum;
  /** @format date */
  dueDate?: string;
}

export interface RegisterRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface AuthenticationResponse {
  token?: string;
  username?: string;
}

export interface ProjectDTO {
  /** @format int32 */
  projectId?: number;
  projectName?: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface GroupDTO {
  /** @format int32 */
  groupId?: number;
  groupName?: string;
  /** @format int32 */
  projectId?: number;
}

export interface ProjectInviteRequest {
  email?: string;
  /** @format int32 */
  projectId?: number;
}

export interface UserDTO {
  /** @format int32 */
  userId?: number;
  email?: string;
  username?: string;
}

export interface Column {
  title: string;
  items: TaskResponse[];
}

export interface Columns {
  [key: string]: Column;
}

export enum TaskDtoStatusEnum {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type UpdateTaskData = TaskResponse;

export type CreateTaskData = TaskResponse;

export type RegisterData = AuthenticationResponse;

export type GetUserProjectsData = ProjectDTO[];

export type CreateProjectData = ProjectDTO;

export type LoginData = object;

export type CreateGroupData = GroupDTO;

export type GetGroupTasksData = TaskResponse[];

export type GetProjectData = ProjectDTO;

export type GetProjectGroupsData = GroupDTO[];
