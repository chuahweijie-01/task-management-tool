import { CreateTaskDto } from "../dto/create-task-dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { GetAllTaskResponse } from "../interfaces/get-all-task-response";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = `${BASE_URL}/task`;

const apiRequest = async <T>(
  endpoint: string,
  method: string,
  body?: object
): Promise<T> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API error (${method} ${endpoint}):`, errorText);
    throw new Error(errorText || 'API request failed');
  }

  return response.json();
};

export const getTasks = (): Promise<GetAllTaskResponse[]> => {
  return apiRequest<GetAllTaskResponse[]>('', 'GET');
};

export const createTask = (taskData: CreateTaskDto): Promise<GetAllTaskResponse[]> => {
  return apiRequest<GetAllTaskResponse[]>('', 'POST', taskData);
};

export const updateTaskStatus = (
  taskId: string,
  taskData: Pick<UpdateTaskDto, 'isCompleted'>
): Promise<GetAllTaskResponse[]> => {
  return apiRequest<GetAllTaskResponse[]>(`/${taskId}/status`, 'PUT', taskData);
};

export const updateTask = (
  taskId: string,
  taskData: Partial<UpdateTaskDto>
): Promise<GetAllTaskResponse[]> => {
  return apiRequest<GetAllTaskResponse[]>(`/${taskId}`, 'PUT', taskData);
};

export const deleteTask = (taskId: string): Promise<GetAllTaskResponse[]> => {
  return apiRequest<GetAllTaskResponse[]>(`/${taskId}`, 'DELETE');
};
