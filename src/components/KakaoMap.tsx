'use client';

import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface KakaoMapProps {
    initialLat: number;
    initialLon: number;
    level: number;
    mapId: string;
    latitude?: number;
    longitude?: number;
}

const KakaoMap = ({ initialLat, initialLon, level, mapId, latitude, longitude }: KakaoMapProps) => {
    const mapRef = useRef<null | any>(null); // 지도 객체를 저장할 ref

    useEffect(() => {
        const initializeMap = () => {
            const container = document.getElementById(mapId);
            if (!container) return;

            const options = {
                center: new window.kakao.maps.LatLng(initialLat, initialLon),
                level,
            };

            // 지도 생성 후 ref에 저장
            mapRef.current = new window.kakao.maps.Map(container, options);
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
                    window.kakao.maps.load(() => initializeMap());
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
    }, [initialLat, initialLon, level, mapId]);

    useEffect(() => {
        // 좌표가 변경되면 지도 중심 이동
        if (latitude && longitude && mapRef.current) {
            const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
            mapRef.current.setCenter(moveLatLon);
        }
    }, [latitude, longitude]);

    return (
        <div
            id={mapId}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default KakaoMap;