'use client';

import { Backdrop, Box, CardMedia, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import CafeMap from '@/components/CafeMap';
import CafeList from '@/components/CafeList';
import React, { useState, useEffect } from 'react';
import CafeViewer from "@/components/CafeViewer";
import { Cafe, CafeSimple } from '@/types';
import { getCafeAll, getCafeById } from "@/app/api/cafe";

const Page = () => {
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null); // Selected Cafe details
    const [selectedPosting, setSelectedPosting] = useState(null); // Selected posting for modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
    const [cafes, setCafes] = useState<CafeSimple[]>([]); // List of cafes
    const [isLoading, setIsLoading] = useState(false); // Loading state for API
    const [error, setError] = useState<string | null>(null); // Error state

    // Fetch all cafes on component mount
    useEffect(() => {
        const fetchCafes = async () => {
            setIsLoading(true);
            try {
                const res = await getCafeAll();
                if (Array.isArray(res)) {
                    setCafes(res);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err: any) {
                console.error("Error fetching cafes:", err);
                setError(err.message || "Failed to load cafes.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCafes();
    }, []);



    // Automatically select the first cafe when the list changes
    useEffect(() => {
        if (cafes.length > 0) {
            handleCafeClick(cafes[0]);
        }
    }, [cafes]);

    // Fetch selected cafe details
    const handleCafeClick = async (cafe: Cafe) => {
        let id = cafe.id;
        console.log("handleCafeClick received:", id); // 로그 추가
        if (typeof id !== 'number') {
            console.error("Invalid cafe ID:", id);
            setError("Invalid cafe ID.");
            return;
        }

        try {
            const res = await getCafeById(id);
            setSelectedCafe(res);
        } catch (err: any) {
            console.error("Error fetching cafe details:", err);
            setError(err.message || "Failed to load cafe details.");
        }
    };

    // Handle modal interactions
    const handlePostingClick = (posting: any) => {
        setSelectedPosting(posting);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPosting(null);
        setIsModalOpen(false);
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
                {/* Cafe Map Section */}
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
                    {selectedCafe ? (
                        <CafeMap
                            name={selectedCafe.name}
                            address={selectedCafe.roadAddress}
                            kakaoLink={selectedCafe.placeUrl}
                            latitude={selectedCafe.latitude}
                            longitude={selectedCafe.longitude}
                            onPlaceButtonClick={() => handlePostingClick(selectedCafe)}
                        />
                    ) : (
                        <Typography>Loading map...</Typography>
                    )}
                </Box>

                {/* Cafe List Section */}
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
                        {isLoading ? (
                            <Typography>Loading cafes...</Typography>
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <CafeList
                                cafes={cafes}
                                onCafeClick={(cafeId: number) => handleCafeClick(cafeId)} // 정확히 id만 전달
                            />
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Navigation Component */}
            <Navigation />

            {/* Modal Component */}
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
                    <Box onClick={(e) => e.stopPropagation()}>
                        <CafeViewer {...selectedPosting} />
                    </Box>
                )}
            </Backdrop>
        </Box>
    );
};

export default Page;