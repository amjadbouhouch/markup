import TipTapEditor from './components/tiptap';

import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import SideBar from './Layouts/SideBar';
const Hello = () => {
  return (
    <TipTapEditor />
  );
};

export default function App() {
  return (
    <Router>
    <div className="w-screen overflow-hidden drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="flex flex-col w-full h-screen overflow-hidden grow drawer-content">
      <div className="h-full overflow-auto">
            {/* content */}
          
          <Routes>
            <Route path="/" element={<Hello />} />
          </Routes>
        </div>
        </div>
        <SideBar />
        </div>
        </Router>
  )
}
