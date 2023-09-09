import React from 'react';
import { Box, Container } from '@mui/material';
import { Header, Loader } from '../../components';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMode } from '../../features/user/userSlice';
const Root = () => {
    const mode = useSelector(selectMode);

    return (
        <>
            <Box
                style={{
                    minHeight: '100vh',
                    minWidth: '100vw',
                    backgroundColor: mode === 'dark' ? '#050301' : '#E2E2E2'
                }}
                display='flex'
                flexDirection='column'
            >
                <Header />
                <Container disableGutters={true} maxWidth='xl' sx={{ flex: 1, mt: 9 }}>
                    <Outlet />
                </Container>
            </Box>
        </>
    );
};

export default Root;
