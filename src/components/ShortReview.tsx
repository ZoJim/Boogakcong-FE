import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';


interface ShortReviewProps {
    cafeId: number;
    cafeName: string;
    content: string;
    createdAt: string;
    onClick?: () => void;
}

const ShortReview = ({ cafeId, cafeName, content, createdAt, onClick }) => {
  return (
    <Card
        onClick={onClick}
      sx={{
        width: 350,
        height: 55,
        minHeight: 55,
          display: 'flex',
        alignItems: 'center', // 카드 내부 컨텐츠 수직 정렬
        boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.2)",
        borderRadius: '12px',
        marginBottom: 1,
        padding: 2, // 내부 패딩 추가
      }}
    >
      <CardContent
        sx={{
          padding: 0,
          width: "100%", // CardContent가 Card의 전체 너비를 차지
          display: 'flex', // Flexbox 사용
          flexDirection: 'column', // 수직 배치
          justifyContent: 'center', // 수직 가운데 정렬
        }}
      >
        {/* 카페 이름과 생성일 한 줄로 표시 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1" sx={{ color: '#2196F3', fontWeight: 'bold', fontSize: 8}}>
            {cafeName}
          </Typography>
          <Typography variant="body1" sx={{ color: '#757575', fontSize: 8 }}>
            {new Date(createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
        </Box>
        {/* 내용 */}
        <Typography variant="body1" sx={{mb:-3}}>{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default ShortReview;
