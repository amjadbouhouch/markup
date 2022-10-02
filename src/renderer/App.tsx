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
import SideBar from './Layouts/SideBar';

export default function AppWrapper() {
  return (
    <Router>
      <div className="w-screen overflow-hidden drawer drawer-mobile">
        <App />
      </div>
      <Toaster />
    </Router>
  );
}
function App() {
  const navigation = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem('lastPageSeen');
    if (id) {
      navigation(`${id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col w-full h-screen overflow-hidden grow drawer-content">
        <div className="flex h-full overflow-auto">
          {/* content */}
          <Routes>
            <Route path="/:pageId" element={<Page />} />
          </Routes>
        </div>
      </div>
      <SideBar />
    </>
  );
}
