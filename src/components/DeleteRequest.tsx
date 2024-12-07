import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const DeleteRequest = () => {
  const [selectedReason, setSelectedReason] = useState('notOperating');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(e.target.value);
  };

  const handleSubmit = () => {
    console.log('선택된 사유:', selectedReason);
    alert('카페 삭제 요청이 제출되었습니다.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.15)',
          width: 350,
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 'bold', mb: 1 }}>
            카페 삭제 요청
          </Typography>
          <Typography variant="body2" sx={{ color: grey[700], mb: 2 }}>
            삭제 요청 사유
          </Typography>
          <RadioGroup value={selectedReason} onChange={handleChange}>
            <FormControlLabel
              value="notOperating"
              control={<Radio />}
              label="더이상 카페를 운영하지 않음"
            />
            <FormControlLabel
              value="difficulty"
              control={<Radio />}
              label="부각콩 모임 유지가 어려움"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="기타"
            />
          </RadioGroup>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          sx={{ borderRadius: 2, bgcolor: blue[500], color: "white" }}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteRequest;
