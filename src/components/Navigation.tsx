'use client';

import { Box, Typography, CardMedia } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/system';

interface NavItem {
    icon: string;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { icon: '/images/cafe.png', label: '카페', href: '/cafe' },
    { icon: '/images/posting.png', label: '게시판', href: '/posting' },
    { icon: '/images/mypage.png', label: '마이페이지', href: '/mypage' },
];

const StyledNavLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover, &:focus, &:active': {
        textDecoration: 'none',
        color: 'inherit',
    },
});

const NavigationBar = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '80px',
                bgcolor: 'background.default',
                borderTop: '1px solid #ddd',
                position: 'fixed',
                bottom: 0,
            }}
        >
            {navItems.map((item, index) => (
                <StyledNavLink key={index} href={item.href}>
                    <CardMedia
                        component="img"
                        src={item.icon}
                        alt={item.label}
                        sx={{
                            width: 40,
                            height: 40,
                            mb: 1,
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '14px',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {item.label}
                    </Typography>
                </StyledNavLink>
            ))}
        </Box>
    );
};

export default NavigationBar;