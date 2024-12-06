import { springApiRequest } from './api';

export const getCafeAll = (token?: string | null) => springApiRequest('GET', '/api/cafes');

export const getCafeById = (id: number, token?: string | null) => {
    if (typeof id !== 'number') {
        throw new Error("Invalid ID: ID must be a number.");
    }
    return springApiRequest('GET', `/api/cafes/${id}`);
};