'use client';

import {Backdrop, Box, CardMedia, Typography} from '@mui/material';
import {blue} from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import CafeMap from '@/components/CafeMap';
import CafeList from '@/components/CafeList';
import React, {useState} from 'react';
import Posting from "@/components/Posting";


const Page = () => {
    const [selectedCafe, setSelectedCafe] = useState({
        name: '레드버튼 부산대점',
        address: '부산 금정구 금정로 75',
        kakaoLink: 'http://place.map.kakao.com/445393846',
        latitude: 35.2314175247574,
        longitude: 129.086345000906,
    });

    const [selectedPosting, setSelectedPosting] = useState(null); // 선택된 게시글 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const handlePostingClick = (posting: any) => {
        setSelectedPosting(posting);
        setIsModalOpen(true);
    };



    const closeModal = () => {
        setSelectedPosting(null);
        setIsModalOpen(false);
    };


    const handleCafeClick = (cafe: {
        name: string;
        address: string;
        kakaoLink: string;
        latitude: number;
        longitude: number;
    }) => {
        setSelectedCafe(cafe);
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
            {/* 콘텐츠 영역 */}
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
                {/* 지도 섹션 */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CardMedia
                            component="img"
                            src="/images/map.png"
                            alt="지도"
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                            지도
                        </Typography>
                    </Box>
                    <CafeMap
                        name={selectedCafe.name}
                        address={selectedCafe.address}
                        kakaoLink={selectedCafe.kakaoLink}
                        latitude={selectedCafe.latitude}
                        longitude={selectedCafe.longitude}
                        onPlaceButtonClick={() => handlePostingClick(selectedCafe)
                        }
                    />
                </Box>

                {/* 카페 목록 섹션 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <CardMedia
                        component="img"
                        src="/images/list.png"
                        alt="카페 목록"
                        sx={{ width: 30, height: 30, mr: 1 }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                        카페 목록
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex', // Flexbox 사용
                        flexDirection: 'column', // 세로 정렬
                        alignItems: 'center', // 타이틀과 리스트를 수평 가운데 정렬
                    }}
                >
                    {/* 스크롤 가능한 리스트 */}
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
                                {
                                    id: 1,
                                    name: '레드버튼 부산대점',
                                    distance: '3',
                                    latitude: 35.2314175247574,
                                    longitude: 129.086345000906,
                                    address: '부산 금정구 금정로 75',
                                    kakaoLink: 'http://place.map.kakao.com/445393846',
                                },
                                {
                                    id: 2,
                                    name: '보노베리',
                                    distance: '5',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/54054644',
                                },
                                {
                                    id: 3,
                                    name: '카페 노티드',
                                    distance: '7',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/540'
                                },
                                {
                                    id: 4,
                                    name: '카페 노티드',
                                    distance: '7',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/540'
                                },{
                                    id: 5,
                                    name: '카페 노티드',
                                    distance: '7',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/540'
                                }

                            ]}
                            onCafeClick={handleCafeClick}
                        />
                    </Box>
                </Box>
            </Box>

            {/* 네비게이션 바 */}
            <Navigation />

            {/* 모달 영역 */}
            <Backdrop
                open={isModalOpen}
                sx={{
                    zIndex: 1000,
                    flexDirection: 'column',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(4px)', // 블러 효과
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 어두운 배경
                }}
                onClick={closeModal} // 모달 닫기
            >
                {selectedPosting && (
                    <Posting
                        sx={{
                            display: 'flex',
                            padding: 3,
                            borderRadius: 4,
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',

                        }}
                        onClick={(e) => e.stopPropagation()}
                        title={selectedPosting.title}
                        content={selectedPosting.content}
                        createdAt={selectedPosting.createdAt}
                        imageUrl={selectedPosting.imageUrl}
                        isEditorMode={false}
                        isCafe={true}
                    />
                )}
            </Backdrop>
        </Box>
    );
};

export default Page;