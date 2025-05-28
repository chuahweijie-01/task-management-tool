import { LoginUserDto } from "../login/dto/login-user.dto";
import { CreateUserDto } from "../signup/dto/create-user.dto";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_URL = `${BASE_URL}/auth`;
const USER_URL = `${BASE_URL}/user`;

export const create = async (createUser: CreateUserDto) => {
    try {
        const response = await fetch(`${USER_URL}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: createUser.email,
                password: createUser.password,
                username: createUser.username
            })
        });

        if (!response.ok) {
            throw new Error('Account creation failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const login = async (loginUser: LoginUserDto) => {
    try {
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: loginUser.email,
                password: loginUser.password
            })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${AUTH_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}