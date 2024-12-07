import React from 'react';
import { Box, Typography } from '@mui/material';

interface DeleteInfoProps {
  cafeID: number;
  cafeName: string;
  deleteReason: string;
}

enum DeleteReason {
    CAFE_CLOSED = "더이상 운영하지 않음",
    CAFE_UNMAINTAINABLE = "유지보수 어려움",
    ETC = "기타"
}

const DeleteInfo: React.FC<DeleteInfoProps> = ({ cafeID, cafeName, deleteReason }) => {
    console.log(deleteReason);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        p: 1,
        bgcolor: 'white',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="body2" sx={{ mr: 2 }}>
        CAFE ID: {cafeID}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 2 }}>
        {cafeName}
      </Typography>
      <Typography variant="body2">
        {DeleteReason[deleteReason as keyof typeof DeleteReason]}
      </Typography>
    </Box>
  );
};

export default DeleteInfo;
