import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import PageRender from './pageRender';
import NotFound from './components/notFound';

const App = () => (
  <Router>
    <input type='checkbox' id='theme' />
    <div className='App'>
      <div className='main'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/:page' element={<PageRender />} />
          <Route path='/:page/:id' element={<PageRender />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
