import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import './app.css';
import Page from './app/Page';
import NewPageForm from './components/forms/NewPageForm';
import SideBar from './Layouts/SideBar';

const Hello = () => {
  return <div />;
};

export default function App() {
  return (
    <Router>
      <div className="w-screen overflow-hidden drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col w-full h-screen overflow-hidden grow drawer-content">
          <div className="flex h-full overflow-auto">
            {/* content */}
            <Routes>
              <Route path="/" element={<Hello />} />
              <Route path="/:pageId" element={<Page />} />
            </Routes>
          </div>
        </div>
        <SideBar />
        {/* Modals */}
        <NewPageForm />
      </div>
    </Router>
  );
}
