import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectUnit } from '../../../features/user/userSlice';

const CurrentWeather = ({ currentWeather }) => {
    const { Temperature, WeatherText, TemperatureSummary } = currentWeather;
    const unit = useSelector(selectUnit);

    const currentTemperature = Temperature[unit].Value;
    const temperatureUnit = Temperature[unit].Unit;

    const minTemperature = TemperatureSummary.Past24HourRange.Minimum[unit].Value;
    const maxTemperature = TemperatureSummary.Past24HourRange.Maximum[unit].Value;

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                minWidth: {
                    xs: '100%',
                    md: 600
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: (theme) => theme.palette.primary.main
            }}
        >
            <Typography variant='h2' gutterBottom>
                Current Weather: {WeatherText}
            </Typography>

            <Box display='flex' alignItems='center'>
                <Typography variant='h4' component='div'>
                    {currentTemperature}°{temperatureUnit}
                </Typography>
                <Typography variant='subtitle1' sx={{ marginLeft: 1 }}>
                    Current Temperature
                </Typography>
            </Box>

            <Box display='flex' justifyContent='space-between'>
                <Box sx={{ mr: 4 }}>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        Min:
                    </Typography>
                    <Typography variant='h6' component='div'>
                        {minTemperature}°{temperatureUnit}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        Max:
                    </Typography>
                    <Typography variant='h6' component='div'>
                        {maxTemperature}°{temperatureUnit}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default CurrentWeather;
