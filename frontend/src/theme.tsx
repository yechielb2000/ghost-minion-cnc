import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Palette {
        backgroundPage: Palette['primary'];
        redSpecial: Palette['primary'];
    }

    interface PaletteOptions {
        backgroundPage?: PaletteOptions['primary'];
        redSpecial?: PaletteOptions['primary'];
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0E3740',
        },
        secondary: {
            main: '#BF6860',
        },
        backgroundPage: {
            main: '#F2F8FC',
        },
        redSpecial: {
            main: '#F2274C'
        }
    },

});