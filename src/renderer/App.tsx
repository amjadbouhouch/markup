import TipTapEditor from './components/tiptap';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css'
const Hello = () => {
  return (
    <div>
      <div>
      <progress className="progress progress-primary w-56" value="40" max="100"></progress>
      </div>
      <TipTapEditor />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
