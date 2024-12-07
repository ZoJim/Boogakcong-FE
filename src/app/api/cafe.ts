import {springApiRequest} from './api';

export const getCafeAll = (token?: string | null) => springApiRequest('GET', '/api/cafes');

export const getCafeById = (id: number, token?: string | null) => {
    if (typeof id !== 'number') {
        throw new Error("Invalid ID: ID must be a number.");
    }
    return springApiRequest('GET', `/api/cafes/${id}`);
};

export const requestCafeRegister = (cafeId: number, token: string) => {
    const queryString = `?cafeId=${encodeURIComponent(cafeId)}`;
    return springApiRequest('POST', `/api/cafes/owners/request${queryString}`, token);
};

export const updateCafeDetail = (token: string,
                                 notice: string,
                                 isWifi: boolean,
                                 outletCount: number,
                                 maxPeoplePerTable: number) => {
    return springApiRequest('POST', '/api/cafes/owners/update', token, {
            notice,
            isWifi,
            outletCount,
            maxPeoplePerTable,
        }
    );
}

export const deleteCafe = (token: string, reason: number) => {
    const queryString = `?reasonId=${encodeURIComponent(reason)}`;

    return springApiRequest('DELETE', `/api/cafes/owners/request${queryString}`, token,);
}

export const getCafeDeleteRequest = (token: string) => springApiRequest('GET', '/api/cafes/owners/delete', token);
export const approveCafeDeleteRequest = (token: string, requestId: number) => {
    const queryString = `?requestId=${encodeURIComponent(requestId)}&accept=true`;
    return springApiRequest('POST', `/api/cafes/owners/delete${queryString}`, token);
}

export const rejectCafeDeleteRequest = (token: string, requestId: number) => {
    const queryString = `?requestId=${encodeURIComponent(requestId)}&accept=false`;
    return springApiRequest('POST', `/api/cafes/owners/delete${queryString}`, token);
}

export const getCafeRegisterRequest = (token: string) => springApiRequest('GET', '/api/cafes/owners/request', token);
export const approveCafeRegisterRequest = (token: string, requestId: number) => {
    const queryString = `?requestId=${encodeURIComponent(requestId)}&accept=true`;
    return springApiRequest('POST', `/api/cafes/owners/accept${queryString}`, token);
}

export const analyzeCafeCount = (token: string) => springApiRequest('GET', '/api/cafes/analysis', token);

export const addNewCafeByKakao = (token: string) => {
    return springApiRequest('POST', '/api/cafes/kakao', token)
}