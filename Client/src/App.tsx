import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PageRender from './pageRender';
import NotFound from './components/notFound';
import Login from './components/login';
import Register from './components/register';
import Home from './components/Home/home';
import { refreshToken } from './redux/actions/authAction';
import Alert from './components/notify/notify';
import Header from './components/header';
import PrivateRouter from './privateRoter';
import StatusModal from './components/statusModal';
import { getPosts } from './redux/actions/postAction';

interface INotify extends Object {
  token: string;
}

interface IState extends DefaultRootState {
  auth: INotify;
  status: boolean;
}

const App = () => {
  const { auth, status } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className='App'>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal />}
          <Routes>
            <Route path='/' element={auth.token ? <Home /> : <Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<PrivateRouter />}>
              <Route path='/:page' element={<PageRender />} />
              <Route path='/:page/:id' element={<PageRender />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
