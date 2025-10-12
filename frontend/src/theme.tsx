import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Palette {
        backgroundPage: Palette['primary'];
        redSpecial: Palette['primary'];
        brownSpecial: Palette['primary'];
        greySpecial: Palette['primary'];
    }

    interface PaletteOptions {
        backgroundPage?: PaletteOptions['primary'];
        redSpecial?: PaletteOptions['primary'];
        brownSpecial?: PaletteOptions['primary'];
        greySpecial?: PaletteOptions['primary'];
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0E3740',
        },
        secondary: {
            main: '#E3371E',
        },
        backgroundPage: {
            main: '#F2F8FC',
        },
        redSpecial: {
            main: '#F2274C'
        },
        brownSpecial: {
            main: '#BF6860'
        },
        greySpecial: {
            main: '#68828C'
        }
    },
    typography: {
        fontFamily: [
            'Tomorrow',
            'sans-serif',
        ].join(','),
    },
});