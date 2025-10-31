import axios from 'axios';
import { User } from './types';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchUsers = async (): Promise<User[]> => {
  const res = await API.get('/users');
  return res.data;
};

export const createUser = async (user: User): Promise<User> => {
  const res = await API.post('/users', user);
  return res.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const res = await API.put(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await API.delete(`/users/${id}`);
};
