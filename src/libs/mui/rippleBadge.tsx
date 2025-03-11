import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export const RippleBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#b4dcff8f',
        color: '#2c40bdd6',
        boxShadow: `0`,
        '&::after': {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '2px solid #32c2c1',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));