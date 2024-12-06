import { springApiRequest } from './api';

export const getUser = (token: string) => springApiRequest('GET', '/api/member/me', token);
