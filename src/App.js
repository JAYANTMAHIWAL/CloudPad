import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import About from './components/About';
import Notes from './components/Notes';

function App() {
  return (
    <>
      <NoteState>
        <Router>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<About />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/notes" element={<Notes />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
