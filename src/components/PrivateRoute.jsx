import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = localStorage.getItem('admin_token');
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
