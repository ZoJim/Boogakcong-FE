'use client';

import {Backdrop, Box, CardMedia, Typography} from '@mui/material';
import {blue} from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import CafeMap from '@/components/CafeMap';
import CafeList from '@/components/CafeList';
import React, {useState} from 'react';
import CafeViewer from "@/components/CafeViewer";
import {Cafe} from '@/types'; // types.ts에서 Cafe 인터페이스를 가져옴

const Page = () => {
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null); // 타입 설정
    const [selectedPosting, setSelectedPosting] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePostingClick = (posting: any) => {
        setSelectedPosting(posting);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPosting(null);
        setIsModalOpen(false);
    };

    const handleCafeClick = (cafeId: number) => {
        // FIXME: 아래 코드는 임시로 작성한 코드입니다
        // 실제로는 서버에서 카페 정보를 가져와야 합니다.
        setSelectedCafe({
                cafeName: '레드버튼 부산대점',
                phoneNumber: '051-515-1234',
                roadAddress: '부산 금정구 금정로 75',
                addressDetail: '레드버튼 부산대점',
                latitude: 35.2314175247574,
                longitude: 129.086345000906,
                placeUrl: 'http://place.map.kakao.com/445393846',
                outletCount: 10,
                maxPeoplePerTable: 4,
                notice: '안녕하세요 ~ :) 유일무이 카페입니다. 커피 1번 리필 가능해요~! 얼마전에 오픈했으니 자주 와주세요!',
                isWifi: true,
                reviewResponse: [
                    {
                        id: 2,
                        cafeId: 1,
                        content: '공부하기 꽤 괜찮네요.',
                        createdAt: '2024-12-06T00:19:53.602633',
                    }
                ]
            }
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                bgcolor: blue[200],
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    width: '100%',
                    padding: '16px',
                    alignItems: 'center',
                    mt: 3,
                }}
            >
                <Box sx={{mb: 4}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <CardMedia
                            component="img"
                            src="/images/map.png"
                            alt="지도"
                            sx={{width: 30, height: 30, mr: 1}}
                        />
                        <Typography variant="h3" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                            지도
                        </Typography>
                    </Box>
                    {selectedCafe && (
                        <CafeMap
                            name={selectedCafe.cafeName}
                            address={selectedCafe.roadAddress}
                            kakaoLink={selectedCafe.placeUrl}
                            latitude={selectedCafe.latitude}
                            longitude={selectedCafe.longitude}
                            onPlaceButtonClick={() => handlePostingClick(selectedCafe)}
                        />
                    )}
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center', mb: 0.5}}>
                    <CardMedia
                        component="img"
                        src="/images/list.png"
                        alt="카페 목록"
                        sx={{width: 30, height: 30, mr: 1}}
                    />
                    <Typography variant="h3" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                        카페 목록
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            height: '300px',
                            width: '400px',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                        }}
                    >
                        <CafeList
                            cafes={[
                                // FIXME: 아래 코드는 임시로 작성한 코드입니다
                                // 실제로는 서버에서 카페 목록을 가져와야 합니다.
                                {
                                    name: '레드버튼 부산대',
                                    distance: 5,
                                    id: 1,
                                },
                                {
                                    name: '레드버튼 부산대',
                                    distance: 5,
                                    id: 2,
                                },
                                {
                                    name: '레드버튼 부산대',
                                    distance: 5,
                                    id: 3,
                                },
                                {
                                    name: '레드버튼 부산대',
                                    distance: 5,
                                    id: 4,
                                },
                                {
                                    name: '레드버튼 부산대',
                                    distance: 5,
                                    id: 5,
                                }
                            ]}
                            onCafeClick={handleCafeClick}
                        />
                    </Box>
                </Box>
            </Box>

            <Navigation/>

            <Backdrop
                open={isModalOpen}
                sx={{
                    zIndex: 1000,
                    flexDirection: 'column',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
                onClick={closeModal}
            >
                {selectedPosting && (
                    <Box
                        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
                    >
                        <CafeViewer
                            {...selectedPosting}

                        />
                    </Box>
                )}
            </Backdrop>
        </Box>
    );
};

export default Page;