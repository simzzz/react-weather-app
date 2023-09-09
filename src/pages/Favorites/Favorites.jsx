import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Paper
} from '@mui/material';
import { selectFavorites } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';

const Favorites = () => {
    const navigate = useNavigate();
    const favoriteLocations = Object.values(useSelector(selectFavorites));

    const handleListItemClick = (location) => {
        navigate('/', { state: { cityId: location.id, city: location.name } });
    };

    return (
        <Container maxWidth='md'>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant='h4' gutterBottom>
                    Favorites
                </Typography>
                {favoriteLocations.length === 0 ? (
                    <Typography variant='body1'>No favorites yet</Typography>
                ) : (
                    <List>
                        {favoriteLocations.map((location) => (
                            <ListItem
                                key={location.id}
                                component={ListItemButton}
                                onClick={() => handleListItemClick(location)}
                            >
                                <ListItemText primary={location.name} secondary='Current Weather' />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
};

export default Favorites;
