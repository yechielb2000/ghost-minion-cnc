import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface Palette {
        backgroundPage: Palette['primary'];
    }

    interface PaletteOptions {
        backgroundPage?: PaletteOptions['primary'];
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
    },

});