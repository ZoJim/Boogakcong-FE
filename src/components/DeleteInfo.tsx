import React from 'react';
import { Box, Typography } from '@mui/material';

interface DeleteInfoProps {
  cafeID: number;
  cafeName: string;
  reason: string;
}

const DeleteInfo: React.FC<DeleteInfoProps> = ({ cafeID, cafeName, reason }) => {
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
        {reason}
      </Typography>
    </Box>
  );
};

export default DeleteInfo;
