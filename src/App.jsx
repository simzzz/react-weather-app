import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';

import { StyledEngineProvider } from '@mui/material/styles';
import store from './setup/store';
import AppThemeProvider from './theme/AppThemeProvider';

function App() {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <AppThemeProvider>
                    <RouterProvider router={router} />
                </AppThemeProvider>
            </StyledEngineProvider>
        </Provider>
    );
}

export default App;
