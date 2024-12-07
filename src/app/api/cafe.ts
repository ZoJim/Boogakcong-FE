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

export const deleteCafe = (reason: number, token: string) => {
    const queryString = `?reasonId=${encodeURIComponent(reason)}`;

    return springApiRequest('DELETE', `/api/cafes/owners/request${queryString}`, token, );
}
