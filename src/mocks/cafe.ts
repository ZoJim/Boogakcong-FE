const cafeData = {
    cafe: {
        id: 1,
        name: "레드버튼 부산대점",
        address: {
            road: "부산 금정구 금정로 75",
            detail: "부산 금정구 장전동 417-36"
        },
        phone: "051-515-3799",
        latitude: 35.2314175247574,
        longitude: 129.086345000906,
        placeUrl: "http://place.map.kakao.com/445393846",
        outletCount: 12,
        maxPeoplePerTable: 5,
        notice: "테이블당 최대 5명까지 가능합니다.",
        reviews: [
            {
                id: 2,
                cafeId: 1,
                content: "공부하기 꽤 괜찮네요.",
                createdAt: "2024-12-06T00:19:53.602633"
            }
        ]
    }
};

export default cafeData;