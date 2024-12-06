export interface Cafe {
    cafeName: string;
    phoneNumber: string;
    roadAddress: string;
    addressDetail: string;
    latitude: number;
    longitude: number;
    placeUrl: string;
    outletCount: number;
    maxPeoplePerTable: number;
    notice: string;
    isWifi: boolean;
    reviewResponse: {
        id: number;
        cafeId: number;
        content: string;
        createdAt: string;
    }[];
}

export interface CafeList{
    id: number;
    name: string;
    distance: number;
}