import { springApiRequest } from './api';

export const getUser = (token: string) => springApiRequest('GET', '/api/member/me', token);

export const getCafeStatus = (token: string) => springApiRequest('GET', '/api/cafes/owners/check', token);