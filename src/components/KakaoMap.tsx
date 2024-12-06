'use client';

import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface KakaoMapProps {
    initialLat: number; // 초기 위도
    initialLon: number; // 초기 경도
    level: number; // 지도 확대 수준
    mapId: string; // 고유한 지도 ID
    latitude?: number; // 이동할 위도
    longitude?: number; // 이동할 경도
    markerImage?: string; // 마커 이미지 경로
}

const KakaoMap = ({ initialLat, initialLon, level, mapId, latitude, longitude, markerImage }: KakaoMapProps) => {
    const mapRef = useRef<null | any>(null); // 지도 객체를 저장할 ref
    const markerRef = useRef<null | any>(null); // 마커 객체를 저장할 ref

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

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(initialLat, initialLon);
            const markerOptions: any = {
                position: markerPosition,
            };

            // 마커에 이미지 추가
            if (markerImage) {
                const imageSize = new window.kakao.maps.Size(40, 40); // 마커 이미지 크기
                const markerIcon = new window.kakao.maps.MarkerImage(markerImage, imageSize);
                markerOptions.image = markerIcon;
            }

            // 마커 생성 후 ref에 저장
            markerRef.current = new window.kakao.maps.Marker(markerOptions);
            markerRef.current.setMap(mapRef.current);
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
    }, [initialLat, initialLon, level, mapId, markerImage]);

    useEffect(() => {
        // 지도와 마커 위치 업데이트
        if (latitude && longitude && mapRef.current && markerRef.current) {
            const newPosition = new window.kakao.maps.LatLng(latitude, longitude);
            mapRef.current.setCenter(newPosition); // 지도 중심 이동
            markerRef.current.setPosition(newPosition); // 마커 위치 이동
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