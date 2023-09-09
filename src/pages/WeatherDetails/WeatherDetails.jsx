import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    IconButton,
    Box,
    List,
    ListItemButton,
    ListItemText,
    Popper,
    Grow,
    ClickAwayListener
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectForecast,
    selectCurrentWeather,
    selectAutocomplete,
    selectIsLoading,
    selectError
} from '../../features/weather/weatherSlice';
import {
    addToFavorites,
    removeFromFavorites,
    selectIsFavorite
} from '../../features/user/userSlice';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import {
    useGetCurrentWeatherMutation,
    useGetForecastMutation,
    useLocationAutocompleteMutation
} from '../../features/weather/weatherApiSlice';
import { Loader, ErrorModal } from '../../components';

const WeatherDetails = () => {
    const location = useLocation();
    const { cityId: initialCityId, city: initialCity } = location.state || {};
    const isLoading = useSelector(selectIsLoading);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const error = useSelector(selectError);
    const [errorMessage, setErrorMessage] = useState(error);

    const dispatch = useDispatch();
    const [city, setCity] = useState(initialCity || 'London');
    const [cityId, setCityId] = useState(initialCityId || 328328);
    const currentWeather = useSelector(selectCurrentWeather);
    const forecast = useSelector(selectForecast);
    const isFavorite = useSelector((state) => selectIsFavorite(state, cityId));
    const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
    const locations = useSelector(selectAutocomplete);

    const [autocompleteOpen, setAutocompleteOpen] = useState(false);
    const [inputValue, setInputValue] = useState(city);
    const anchorRef = useRef(null);

    const [getCurrentWeather, {}] = useGetCurrentWeatherMutation();
    const [getForecast, {}] = useGetForecastMutation();
    const [locationAutocomplete, {}] = useLocationAutocompleteMutation();

    const toggleFavorite = () => {
        localIsFavorite
            ? dispatch(removeFromFavorites({ id: cityId }))
            : dispatch(addToFavorites({ id: cityId, name: city, currentWeather }));

        setLocalIsFavorite(!localIsFavorite);
    };

    const debouncedHandleInputChange = debounce(async (inputValue) => {
        await locationAutocomplete(inputValue);
    }, 500);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const sanitizedInput = inputValue.replace(/[^a-zA-Z ]/g, ''); // Only english letters and spaces
        setInputValue(sanitizedInput);
        setAutocompleteOpen(true);

        debouncedHandleInputChange(sanitizedInput);
    };

    const handleListItemClick = async (selectedCity) => {
        setInputValue(selectedCity.LocalizedName);
        setCity(selectedCity.LocalizedName);
        setCityId(selectedCity.Key);
        setAutocompleteOpen(false);
        await getCurrentWeather(selectedCity.Key);
        await getForecast(selectedCity.Key);
    };

    const handleClickAway = () => {
        setAutocompleteOpen(false);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            await getCurrentWeather(cityId);
            await getForecast(cityId);
        };

        fetchWeatherData();
    }, [cityId]);

    useEffect(() => {
        setLocalIsFavorite(isFavorite);
    }, [isFavorite]);

    useEffect(() => {
        if (error) {
            setErrorMessage(error);
            setIsErrorModalOpen(true);
        }
    }, [error]);

    return isLoading && !error && false ? (
        <Loader show={isLoading} />
    ) : (
        <Container maxWidth='md'>
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 4
                    }}
                >
                    <Typography variant='h4' sx={{ mr: 2 }}>
                        Weather Details for {city}
                    </Typography>
                    <IconButton
                        color='primary'
                        onClick={toggleFavorite}
                        aria-label='Toggle Favorite'
                    >
                        {localIsFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
                {/* Search field */}
                <Box>
                    <TextField
                        label='Search City'
                        variant='outlined'
                        value={inputValue}
                        onChange={handleInputChange}
                        sx={{ mb: 4, width: { xs: 280, sm: 550, md: 640 } }}
                        inputProps={{
                            pattern: '[a-zA-Z]*' // Regular expression to allow only English letters and spaces
                        }}
                        inputRef={anchorRef}
                    />
                    {/* Autocomplete list */}
                    <Popper
                        open={autocompleteOpen}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom'
                                }}
                            >
                                <Paper
                                    sx={{
                                        maxHeight: 200,
                                        overflow: 'auto'
                                    }}
                                >
                                    <ClickAwayListener onClickAway={handleClickAway}>
                                        <List>
                                            {locations
                                                ?.filter((option) =>
                                                    option.LocalizedName.toLowerCase().includes(
                                                        inputValue.toLowerCase()
                                                    )
                                                )
                                                .map((option) => (
                                                    <ListItemButton
                                                        key={option.Key}
                                                        onClick={() => handleListItemClick(option)}
                                                        sx={{
                                                            width: { xs: 280, sm: 550, md: 640 }
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={option.LocalizedName}
                                                        />
                                                    </ListItemButton>
                                                ))}
                                        </List>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Box>

                {currentWeather && <CurrentWeather currentWeather={currentWeather} />}

                {forecast && <Forecast forecast={forecast} />}
            </Paper>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                errorMessage={errorMessage}
            />
        </Container>
    );
};

export default WeatherDetails;
