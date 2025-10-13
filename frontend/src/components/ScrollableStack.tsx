import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScrollableStack = styled(Stack)(({ theme }) => ({
    overflowY: 'auto',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
        width: 8,
        height: 8,
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.backgroundPage.main,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.greySpecial.main,
        borderRadius: 6,
        border: `3px solid ${theme.palette.backgroundPage.main}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export default ScrollableStack;