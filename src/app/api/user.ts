import { springApiRequest } from './api';

export const getUser = (token: string) => springApiRequest('GET', '/api/member/me', token);

export const getCafeStatus = (token: string) => springApiRequest('GET', '/api/cafes/owners/check', token);

export const getUserList = (token: string) => springApiRequest('GET', '/api/member/list', token);

export const deleteUser = (token: string, userId: number) => springApiRequest('DELETE', `/api/member/${userId}`, token);

export const analyzeUser = (token: string) => springApiRequest('GET', '/api/member/analysis', token);

export const changeRole = (token: string, userId: number, role: string) => {
    const queryString = `?userId=${encodeURIComponent(userId)}&role=${encodeURIComponent(role)}`;
    return springApiRequest('PATCH', `/api/member/role${queryString}`, token);
}