import { springApiRequest } from './api';

export const login = (email: string, password: string) =>  springApiRequest('POST', '/api/member/auth/login', null, { email, password });

export const signup = (email: string, password: string, name: string, phoneNumber: String) => springApiRequest('POST', '/api/member/auth/signup', null, { email, password, name, phoneNumber });