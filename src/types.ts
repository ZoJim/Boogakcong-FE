export interface Cafe {
    id: number;
    name: string;
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

export interface CafeSimple {
    id: number;
    name: string;
    timeFromMainGate: number;
}

export interface CafeReview {
    cafeId: number;
    content: string;
    createdAt: string;
}

export interface Posting {
    id: number;
    title: string;
    content: string;
    userId: number;
    // RECRUITMENT, REVIEW -> Enum으로 관리하는게 좋을 듯
    // Enum으로 관리하면 타입스크립트에서도 타입을 강제할 수 있음
    postType: PostType;
    imageUrl: string;
    createdAt: string;
}

export enum PostType {
    RECRUITMENT = 'RECRUITMENT',
    REVIEW = 'REVIEW',
}
