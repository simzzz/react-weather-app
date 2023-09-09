import React from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMode } from '../features/user/userSlice';

function AppThemeProvider({ children }) {
    const mode = useSelector(selectMode);
    const theme = responsiveFontSizes(
        createTheme({
            palette: {
                mode,
                primary: {
                    main: '#1c9c7c'
                },
                secondary: {
                    main: mode === 'dark' ? '#0F8B0FCC' : '#9DF3C4'
                },
                background: {
                    default: mode === 'dark' ? '#020403' : '#E2E2E2',
                    opposite: mode === 'dark' ? '#FCFBFA' : '#020403',
                    paper: mode === 'dark' ? '#28231D' : '#F5F5F5'
                },
                text: {
                    primary: mode === 'dark' ? '#F0F0F0' : '#0F0F0F',
                    secondary: '#AAAAAA',
                    disabled: '#C3C1BD'
                }
            },

            typography: {
                fontFamily: 'Dosis, sans-serif',

                h1: {
                    fontSize: '26px',
                    fontWeight: '600'
                    // lineHeight: '33px',
                },
                h2: {
                    fontSize: '22px',
                    fontWeight: '600'
                    // lineHeight: '28px',
                },
                h3: {
                    fontSize: '20px',
                    fontWeight: '600'
                    // lineHeight: '25px',
                },
                h4: {
                    fontSize: '18px',
                    fontWeight: '600'
                    // lineHeight: '23px',
                },
                h5: {
                    fontSize: '16px',
                    fontWeight: '500'
                    // lineHeight: '20px',
                },

                CTA1: {
                    fontSize: '28px',
                    fontWeight: '500'
                    // lineHeight: '35px',
                },
                CTA2: {
                    fontSize: '18px',
                    fontWeight: '500'
                    // lineHeight: '23px',
                },
                CTA3: {
                    fontSize: '16px',
                    fontWeight: '400'
                    // lineHeight: '20px',
                },
                Body1: {
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400'
                    // lineHeight: '18px',
                },
                Body2: {
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '13px',
                    fontWeight: '400'
                    // lineHeight: '16px',
                },
                Body3: {
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '12px',
                    fontWeight: '400'
                    // lineHeight: '14px',
                },
                Body1Medium: {
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500'
                    // lineHeight: '17px',
                },
                Body1SemiBold: {
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '14px',
                    fontWeight: '600'
                    // lineHeight: '17px',
                },
                body3: {
                    fontSize: '12px',
                    // lineHeight: '16px',
                    display: 'block'
                },
                body4: {
                    fontSize: '10px',
                    // lineHeight: '14px',
                    display: 'block'
                }
            },
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            // ---CSS BODY--- \\
                        }
                    }
                },
                MuiLink: {
                    styleOverrides: {
                        root: {
                            cursor: 'pointer',
                            textDecoration: 'none',
                            lineHeight: '16px',
                            transition: 'all 0.1s ease-in-out',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }
                    }
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            aspectRatio: '1/1'
                        }
                    }
                }
            }
        })
    );
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
