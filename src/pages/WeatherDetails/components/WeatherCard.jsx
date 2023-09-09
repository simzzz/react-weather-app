import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { format, parseISO } from 'date-fns';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUnit } from '../../../features/user/userSlice';

const WeatherCard = ({ dailyForecast, isToday }) => {
    const { Date, Day, Night, Temperature } = dailyForecast;
    const unit = useSelector(selectUnit);

    const dayOfWeek = isToday ? 'Today' : format(parseISO(Date), 'EEE');
    const weatherPhraseDay = Day.IconPhrase;
    const weatherPhraseNight = Night.IconPhrase;

    // The forecast API is incosistent and it doesn't show both metric and imperial in the same request so we
    // calculate it manually to avoid an unnecessary request
    const minTemperature =
        unit === 'Metric'
            ? Temperature.Minimum.Value
            : (Temperature.Minimum.Value * 1.8 + 32).toFixed(1);
    const maxTemperature =
        unit === 'Metric'
            ? Temperature.Maximum.Value
            : (Temperature.Maximum.Value * 1.8 + 32).toFixed(1);
    const symbol = unit === 'Metric' ? '°C' : '°F';

    return (
        <Card
            sx={{
                width: '100%',
                marginBottom: 2,
                backgroundColor: (theme) => theme.palette.secondary.main
            }}
        >
            <CardContent>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='h6'>{dayOfWeek}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='body1'>Day: {weatherPhraseDay}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography variant='body1'>Night: {weatherPhraseNight}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{ mr: 2 }}>
                        <Typography variant='body1'>
                            Min: {minTemperature}
                            {symbol}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Typography variant='body1'>
                            Max: {maxTemperature}
                            {symbol}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
