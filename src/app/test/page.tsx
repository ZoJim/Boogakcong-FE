'use client';

import React from 'react';
import {Box} from '@mui/material';
import {blue} from "@mui/material/colors";
import CafeViewer from "@/components/CafeViewer";

const Page = () => {

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
            <CafeViewer
                name="레드버튼 부산대점"
                phoneNumber="051-515-1234"
                roadAddress="부산 금정구 금정로 75"
                addressDetail="레드버튼 부산대점"
                latitude={35.2314175247574}
                longitude={129.086345000906}
                placeUrl="http://place.map.kakao.com/445393846"
                outletCount={10}
                maxPeoplePerTable={4}
                notice="안녕하세요 ~ :) 유일무이 카페입니다. 커피 1번 리필 가능해요~! 얼마전에 오픈했으니 자주 와주세요!"
                reviewResponse
            />
        </Box>
    );
};

export default Page;
