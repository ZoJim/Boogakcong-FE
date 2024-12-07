import { springApiRequest } from './api';

export const getUser = (token: string) => springApiRequest('GET', '/api/member/me', token);

export const getCafeStatus = (token: string) => springApiRequest('GET', '/api/cafes/owners/check', token);

export const getUserList = (token: string) => springApiRequest('GET', '/api/member/list', token);

export const deleteUser = (userId: number, token: string) => springApiRequest('DELETE', `/api/member/${userId}`, token);