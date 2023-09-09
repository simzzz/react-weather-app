import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './routes/Root';
import Error from './routes/Error';
import Favorites from '../pages/Favorites/Favorites';
import WeatherDetails from '../pages/WeatherDetails/WeatherDetails';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root />} errorElement={<Error />}>
            <Route index element={<WeatherDetails />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Route>
    )
);

export default router;
