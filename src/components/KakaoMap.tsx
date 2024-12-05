'use client';

import React, { useEffect } from 'react';

declare global {
    interface Window {
        kakao: any; // 카카오 객체를 전역 변수로 선언
    }
}

interface KakaoMapProps {
    initialLat: number; // 초기 위도
    initialLon: number; // 초기 경도
    level: number; // 지도 확대 수준
}

const KakaoMap = ({ initialLat, initialLon, level }: KakaoMapProps) => {
    useEffect(() => {
        const initializeMap = () => {
            const container = document.getElementById('map');
            if (!container) {
                console.error('Map container not found');
                return;
            }

            const options = {
                center: new window.kakao.maps.LatLng(initialLat, initialLon), // 지도 중심 좌표
                level, // 확대 수준
            };
            new window.kakao.maps.Map(container, options); // 지도 생성
        };

        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
                window.kakao.maps.load(() => initializeMap());
                return;
            }

            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
            script.async = true;
            script.onload = () => {
                if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
                    window.kakao.maps.load(() => {
                        initializeMap();
                    });
                } else {
                    console.error('Kakao maps load function is not available');
                }
            };
            script.onerror = () => {
                console.error('Failed to load Kakao Maps script');
            };

            document.head.appendChild(script);
        };

        loadKakaoMap();
    }, [initialLat, initialLon, level]);

    return (
        <div
            id="map"
            style={{
                width: '100%',
                height: '400px', // 지도 높이
            }}
        />
    );
};

export default KakaoMap;