import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <ul>
        <li>
          Home
        </li>
        <li>
          Contato
        </li>
      </ul>
      
      <Container customClass="min-height">
        <Routes>
          <Route exact path='/'element={<Home />}></Route>
          <Route exact path='/company'element={<Company />}></Route>
          <Route exact path='/contact'element={<Contact />}></Route>
          <Route exact path='/newproject'element={<NewProject />}></Route>       
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  );
}

export default App;
