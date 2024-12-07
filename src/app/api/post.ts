import { springApiRequest } from './api';
import {PostType} from "@/types";

export const getPostAll = () => springApiRequest('GET', '/api/postings');

export const getTopPost = () => springApiRequest('GET', '/api/postings/top');

export const getMyPost = (token: string) => springApiRequest('GET', '/api/postings/my', token);

export const patchPost = (id: number, title: string, content: string, image: File | string | null, postType:PostType,  token: string) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('file', image);
    }
    console.log(postType.toString());
    formData.append('postType', postType.toString());
    formData.append('id', id.toString());

    return springApiRequest('PATCH', `/api/postings/${id}`, token, formData, true);
}

export const savePost = (title: string, content: string, image: File | string | null, postType:PostType, token: string) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('file', image);
    }
    formData.append('postType', postType.toString());

    return springApiRequest('POST', '/api/postings', token, formData, true);
}