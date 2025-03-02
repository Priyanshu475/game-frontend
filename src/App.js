import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import { Navigate } from 'react-router-dom';
import TriviaGame from './components/TriviaGame';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/game" element={<TriviaGame />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
