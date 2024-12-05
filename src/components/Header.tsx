'use client';

import { useState } from 'react';
import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                    <Link href="/" underline="none" color="inherit">
                        My Website
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                    {isLoggedIn ? (
                        <>
                            <Avatar alt="User" src="/user-avatar.jpg" />
                            <Button variant="outlined" onClick={handleLogin}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};

export default Header;