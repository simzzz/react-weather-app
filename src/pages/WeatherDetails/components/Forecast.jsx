import { Box, Typography } from '@mui/material';
import React from 'react';
import WeatherCard from './WeatherCard';

const Forecast = ({ forecast }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant='h6' gutterBottom>
                5-Day Forecast
            </Typography>
            {forecast?.DailyForecasts?.map((forecast, i) => (
                <WeatherCard key={forecast.Date} dailyForecast={forecast} isToday={i === 0} />
            ))}
        </Box>
    );
};

export default Forecast;
