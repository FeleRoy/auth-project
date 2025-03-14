import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getRoleSelector } from '../services/slice';

type ProtectedRouteProps = {
    children: React.ReactElement;
  };
  
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const role = useSelector(getRoleSelector);

  if (role !== "ADMIN") { // если пользователя в хранилище нет, то делаем редирект
    return <Navigate replace to='/greeting'/>;
  }
  
  if (role === "ADMIN") {
    return children ;
  }

    
}