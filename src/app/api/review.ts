import { springApiRequest } from './api';

export const postReview = (token: string, cafeId: number, content: string) => springApiRequest('POST', '/api/cafes/review', token, { cafeId, content });