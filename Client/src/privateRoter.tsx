import { Navigate, useLocation, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const location = useLocation();
  const firstLogin = localStorage.getItem('firstLogin');
  return firstLogin ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default PrivateRouter;
