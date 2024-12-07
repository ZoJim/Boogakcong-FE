'use client';

{/* iPad PRO 11 기준 */}

import React from 'react';
import { Box, Typography, Card, TextField, Button, IconButton } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import UserInfo from '@/components/UserInfo';
import ShortReview from '@/components/ShortReview';
import PostingList from '@/components/PostingList';

const Page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        bgcolor: blue[200],
        p: 3,
      }}
    >
      {/* 제목 */}
      <Typography
        variant="h1"
        sx={{
          color: 'white',
          fontSize: 32,
          mb: 3,
        }}
      >
        커뮤니티 매니저 페이지
      </Typography>

      {/* 컨텐츠 섹션 */}
      <Box>
        <Typography variant="h3" sx={{ fontSize: 24, mb: 1, color: 'white' }}>
          회원 관리
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 50,
            gap: 3,
          }}
        >
          {/* 회원 관리 */}
          <Box
            sx={{ flex: 1, p: 0, mb: 2 }}
          >
            {/* 텍스트필드와 검색 버튼 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              {/* 검색창 */}
              <TextField
                placeholder="회원 검색"
                variant="outlined"
                size="small"
                sx={{
                  width: 280,
                  height: 35,
                  marginLeft: 1,
                  bgcolor: "white",
                  borderRadius: 1,
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              />

              {/* 검색 버튼 */}
              <IconButton
                sx={{
                  marginLeft: 1,
                  bgcolor: 'white',
                  padding: 1,
                  borderRadius: '50%',
                  '&:hover': { bgcolor: grey[300] },
                }}
              >
                <img
                  src="/images/search.png"
                  alt="검색"
                  style={{ width: 20, height: 20 }}
                />
              </IconButton>
            </Box>

            {/* 회원 정보 & 삭제 버튼 */}
            {[1, 2].map((id) => (
              <Box
                key={id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 0,
                  mb: 6,
                }}
              >
                <Box sx={{ marginBottom: -5 }}>
                  <UserInfo
                    name="홍길동"
                    role="카페 소유자"
                    email="gildong@gmail.com"
                    onEditCafe={undefined} // 버튼 안보이게
                    onDeleteCafe={undefined} // 버튼 안보이게
                  />
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ marginLeft: -10, bgcolor: 'white' }}
                >
                  삭제
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          {/* 간단 후기 모니터링 */}
          <Typography variant="h3" sx={{ fontSize: 24, mb: 1, color: 'white' }}>
            간단 후기 모니터링
          </Typography>

          {[1, 2, 3].map((id) => (
            <Box
                key={id}
                sx={{
                flex: 1,
                borderRadius: 2,
                p: 0,
                }}
            >
                <ShortReview
                cafeId="1"
                cafeName="유일무이 카페"
                content="커피가 산미있어서 호불호가 갈릴 듯 해요"
                createdAt="2024-12-06T00:19:53.602633"
                onClick={undefined}
                />

            </Box>
            ))}
        </Box>

        {/* 게시글 모니터링 */}
        <Box
            sx={{
                flex: 1,
                borderRadius: 2,
                p: 0,
            }}
        >
          <Typography variant="h3" sx={{ fontSize: 24, mt: 3, mb: 1, color: 'white' }}>
            게시글 모니터링
          </Typography>

          {[1, 2].map((id) => (
            <Box
              key={id}
              sx={{
                mb: 1,
                p: 0,
                borderRadius: 2
              }}
            >

              <PostingList 
                title = "✨ 부산대 최고 유일무이카페 오픈"
                content = "안녕하세요 ~ 유일무이 카페입니다. 커피 1번 리필 가능해요! 얼마전에 오픈했으니 자주 와주세요! 그리고 부산대 이벤트 중이니..."
                createdAt = "2024-12-06T00:19:53.602633"
                imageUrl = "/images/cafe.jpg"
                onClick = {undefined}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
