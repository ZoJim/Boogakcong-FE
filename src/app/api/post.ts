import { springApiRequest } from './api';

export const getPostAll = () => springApiRequest('GET', '/api/postings');