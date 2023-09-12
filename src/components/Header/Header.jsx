import React, { useState } from 'react';
import {
    AppBar,
    Button,
    Container,
    Toolbar,
    Typography,
    ButtonGroup,
    IconButton,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { changeMode, selectMode, changeUnit, selectUnit } from '../../features/user/userSlice';
// import { useGetSettingsMutation, usePostSettingsMutation } from '../../features/user/userApiSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mode = useSelector(selectMode);
    const unit = useSelector(selectUnit);

    // const [getSettings] = useGetSettingsMutation();
    // const [postSettings] = usePostSettingsMutation();
    // const [mode, setMode] = useState('dark');
    // const [unit, setUnit] = useState('metric');

    // useEffect(() => {
    //     const getSettings = async () => {
    //         const { data } = await getSettings();
    //         dispatch(changeMode(data.mode));
    //         dispatch(changeUnit(data.unit));
    //     }
    // }, []);

    const handleUnitChange = async (event, newUnit) => {
        if (newUnit !== null) {
            dispatch(changeUnit(newUnit));
            // await postSettings({ mode, unit: newUnit });
        }
    };

    const handleModeChange = async (event, newMode) => {
        if (newMode !== null) {
            dispatch(changeMode());
            // await postSettings({ mode: newMode, unit });
        }
    };

    return (
        <AppBar position='fixed' color='primary'>
            <Container maxWidth='lg'>
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' },
                            color: 'text.primary'
                        }}
                        onClick={() => navigate('/')}
                    >
                        WeatherApp
                    </Typography>
                    <ButtonGroup variant='text' color='inherit'>
                        {
                            <>
                                <Button
                                    component={RouterLink}
                                    to='/'
                                    sx={{
                                        color: 'text.primary'
                                    }}
                                >
                                    Overview
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to='/favorites'
                                    sx={{
                                        color: 'text.primary'
                                    }}
                                >
                                    Favorites
                                </Button>
                            </>
                        }
                    </ButtonGroup>
                    <ToggleButtonGroup
                        value={unit}
                        exclusive
                        onChange={handleUnitChange}
                        aria-label='temperature unit'
                    >
                        <ToggleButton
                            value='Metric'
                            aria-label='Celsius'
                            sx={{
                                color: 'text.primary'
                            }}
                        >
                            °C
                        </ToggleButton>
                        <ToggleButton
                            value='Imperial'
                            aria-label='Fahrenheit'
                            sx={{
                                color: 'text.primary'
                            }}
                        >
                            °F
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <IconButton onClick={() => dispatch(changeMode())}>
                        <Brightness4Icon
                            sx={{
                                transition: 'transform 0.4s',
                                transform: mode === 'dark' ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
