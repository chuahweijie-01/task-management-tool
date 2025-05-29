import { LoginUserDto } from "../login/dto/login-user.dto";
import { LoginUserResponse } from "../login/interfaces/login-user-response.dto";
import { CreateUserDto } from "../signup/dto/create-user.dto";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_URL = `${BASE_URL}/auth`;
const USER_URL = `${BASE_URL}/user`;

const apiRequest = async <T>(
  endpoint: string,
  method: string,
  body?: object
): Promise<T> => {
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
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

export const create = (createUser: CreateUserDto) => {
  return apiRequest(`${USER_URL}`, 'POST', {
    email: createUser.email,
    password: createUser.password,
    username: createUser.username,
  });
};

export const login = (loginUser: LoginUserDto): Promise<LoginUserResponse> => {
  return apiRequest(`${AUTH_URL}/login`, 'POST', {
    email: loginUser.email,
    password: loginUser.password,
  });
};

export const logout = () => {
  return apiRequest(`${AUTH_URL}/logout`, 'POST');
};
