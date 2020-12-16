import React from 'react';
import 'materialize-css';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './routes';
import useAuth from './hooks/auth.hook';
import AuthContext from './context/AuthContext';
import Navbar from './Components/Navbar';
import Loader from './Components/Loader';

const  App = () => {
  const {login, logout, token, userId, ready} = useAuth();
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{ 
      token, userId, login, logout, isAuthenticated
    }}>
      <BrowserRouter>
        { isAuthenticated && <Navbar/> }
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
