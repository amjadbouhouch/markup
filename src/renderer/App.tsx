import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  MemoryRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import './app.css';
import Page from './app/Page';
import { queryClientManager } from './database/queryClientManager';
import SideBar from './Layouts/SideBar';

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClientManager.queryClient}>
      <Router>
        <div className="w-screen overflow-hidden drawer drawer-mobile">
          <App />
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}
function App() {
  const navigation = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('lastPageSeen');
    if (id) {
      navigation(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col w-full h-screen overflow-hidden grow drawer-content">
        <div className="flex h-full overflow-auto">
          {/* content */}
          <Routes>
            <Route path="/:blockId" element={<Page />} />
          </Routes>
          {/* <SearchModal /> */}
        </div>
      </div>
      <SideBar />
    </>
  );
}
