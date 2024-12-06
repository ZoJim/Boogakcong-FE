import { springApiRequest } from './api';

export const getCafeAll = (token?: string | null) => springApiRequest('GET', '/api/cafes');