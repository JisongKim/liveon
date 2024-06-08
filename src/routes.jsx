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
//const Detail = lazy(() => import('./pages/details/Detail'));
const PostDetail = lazy(() => import('./pages/details/PostDetail'));
const ShareDetail = lazy(() => import('./pages/details/ShareDetail'));
const DetailMap = lazy(() => import('./pages/details/DetailMap'));
const Food = lazy(() => import('./pages/products/Food'));
const Shopping = lazy(() => import('./pages/products/Shopping'));
const FreeBoard = lazy(() => import('./pages/posts/FreeBoard'));
const Anonymous = lazy(() => import('./pages/posts/Anonymous'));
const Total = lazy(() => import('./pages/products/Total'));
const Hobby = lazy(() => import('./pages/products/Hobby'));
const Users = lazy(() => import('./pages/users/Users'));
const DetailStatus = lazy(() => import('./pages/details/DetailStatus'));
const AnonymousDetail = lazy(() => import('./pages/details/AnonymousDetail'));
const Chat = lazy(() => import('./pages/chat/Chat'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Logo />} />
      <Route path="/home" element={<Home />} />
      <Route path="products" element={<Total />} />
      <Route path="food" element={<Food />} />
      <Route path="hobby" element={<Hobby />} />
      <Route path="shopping" element={<Shopping />} />
      <Route path="freeBoard" element={<FreeBoard />} />
      <Route path="anonymous" element={<Anonymous />} />
      <Route path="search" element={<Search />} />

      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />

      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<ChangeStatus />} />

      {/* <Route path="products/:id" element={<Detail />} /> */}
      <Route path="products/:id" element={<ShareDetail />} />
      <Route path="posts/:id" element={<PostDetail />} />
      <Route path="posts/anonymous/:id" element={<AnonymousDetail />} />

      <Route path="products/:id/pickupplace" element={<DetailMap />} />
      <Route path="products/:id/status" element={<DetailStatus />} />
      <Route path="users/:id" element={<Users />} />

      <Route path="createroom" element={<CreateRoom />} />
      <Route path="location" element={<Location />} />
      <Route path="chat/:id" element={<Chat />} />
    </>
  )
);

export default router;