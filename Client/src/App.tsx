import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageRender from './pageRender';
import NotFound from './components/notFound';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import { refreshToken } from './redux/actions/authAction';
import Alert from './components/notify/notify';

interface INotify extends Object {
  token: string;
}

interface IState extends DefaultRootState {
  auth: INotify;
}

const App = () => {
  const { auth } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className='App'>
        <div className='main'>
          <Routes>
            <Route path='/' element={auth.token ? <Home /> : <Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/:page' element={<PageRender />} />
            <Route path='/:page/:id' element={<PageRender />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
