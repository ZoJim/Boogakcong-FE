import { springApiRequest } from './api';

export const login = (email: string, password: string) => springApiRequest('POST', '/api/login', null, { email, password });