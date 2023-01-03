import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login/Login';
import Broadcasting from './Broadcasting/Broadcasting';
import Admin from './Admin/Admin'

// CSS
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg'>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/broadcasting' element={<Broadcasting />}></Route>
            <Route path='/admin' element={<Admin />}></Route>
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
