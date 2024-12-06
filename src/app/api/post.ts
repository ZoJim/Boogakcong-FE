import { springApiRequest } from './api';

export const getPostAll = () => springApiRequest('GET', '/api/postings');

export const getTopPost = () => springApiRequest('GET', '/api/postings/top');

export const getMyPost = (token: string) => springApiRequest('GET', '/api/postings/my', token);