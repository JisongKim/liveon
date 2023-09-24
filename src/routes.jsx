import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const CreateRoom = lazy(() => import('./pages/CreateRoom'));
const Location = lazy(() => import('./parts/map/Location'));
const Home = lazy(() => import('./pages/Home'));
const Logo = lazy(() => import('./pages/Logo'));
const Search = lazy(() => import('./pages/Search'));
const Profile = lazy(() => import('./pages/auth/Profile'));
const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ChangeStatus = lazy(() => import('./pages/details/ChangeStatus'));
const Detail = lazy(() => import('./pages/details/Detail'));
const DetailMap = lazy(() => import('./pages/details/DetailMap'));
const Fruit = lazy(() => import('./pages/products/Fruit'));
const Grains = lazy(() => import('./pages/products/Grains'));
const Meat = lazy(() => import('./pages/products/Meat'));
const Total = lazy(() => import('./pages/products/Total'));
const Vegetable = lazy(() => import('./pages/products/Vegetable'));
const Users = lazy(() => import('./pages/users/Users'));
const DetailStatus = lazy(() => import('./pages/details/DetailStatus'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Logo />} />
      <Route path="/home" element={<Home />} />
      <Route path="products" element={<Total />} />
      <Route path="vegetable" element={<Vegetable />} />
      <Route path="fruit" element={<Fruit />} />
      <Route path="grains" element={<Grains />} />
      <Route path="meat" element={<Meat />} />
      <Route path="search" element={<Search />} />

      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />

      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<ChangeStatus />} />

      <Route path="products/:id" element={<Detail />} />

      <Route path="products/:id/pickupplace" element={<DetailMap />} />
      <Route path="products/:id/status" element={<DetailStatus />} />
      <Route path="users/:id" element={<Users />} />

      <Route path="createroom" element={<CreateRoom />} />
      <Route path="location" element={<Location />} />
    </>
  )
);

export default router;
