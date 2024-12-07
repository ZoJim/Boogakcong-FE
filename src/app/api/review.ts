import { springApiRequest } from './api';

export const postReview = (token: string, cafeId: number, content: string) => springApiRequest('POST', '/api/cafes/review', token, { cafeId, content });

export const getMyReview = (token: string) => springApiRequest('GET', '/api/cafes/review/my', token);

export const updateReview = (token: string, reviewId: number, content: string) => springApiRequest('PATCH', `/api/cafes/review`, token, { reviewId ,content });

export const deleteReview = (token: string, reviewId: number) => springApiRequest('DELETE', `/api/cafes/review/${reviewId}`, token);

export const getReviewList = (token: string) => springApiRequest('GET', '/api/cafes/review/all', token);
