import { createContext, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './context/Auth';
import router from './routes';
import { pb } from './api/pocketbase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Spinner from './components/Spinner';
import { Suspense } from 'react';

export const AppContext = createContext();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  pb.autoCancellation(false);
  const [createRoomForm, setCreateRoomForm] = useState({
    category: '',
    title: '',
    content: '',
    price: 0,
    pickup: null,
    payment: '',
    participateCounter: 0,
    meetingPoint: '',
    uploadImage: null,
    status: '',
    location: '',
    creator: '',
    participate: '',
  });

  const appState = {
    createRoomForm,
    updateCreateRoomForm: (key, value) => {
      setCreateRoomForm((state) => {
        return {
          ...state,
          [key]: value,
        };
      });
    },
  };

  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={appState}>
              <div className="max-w-xl mx-auto font-pretendard">
                <Suspense
                  fallback={<Spinner size={200} message="페이지 로딩 중..." />}
                >
                  <RouterProvider router={router} />
                </Suspense>
              </div>
            </AppContext.Provider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AuthProvider>
      </HelmetProvider>

      <Toaster />
    </>
  );
}
export default App;
