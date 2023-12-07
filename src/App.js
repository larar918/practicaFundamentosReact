import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './pages/auth/context';

import AdvertsPage from './pages/adverts/AdvertsPage/AdvertsPage';
import AdvertPage from './pages/adverts/AdvertPage/AdvertPage';
import NewAdvertPage from './pages/adverts/NewAdvertPage/NewAdvertPage';
import LoginPage from './pages/auth/LoginPage';
import NotFoundPage from './pages/notFound/NotFound';


function App({ initiallyLogged }) {

  // Estado para controlar el logeo
  const [isLogged, setIsLogged] = useState(initiallyLogged); // Cuando iniciamos la app, index.js nos dice si el usuario está logeado o no

  const onLoginTrue = (accessToken) => {
    setIsLogged(true);
  }
  const onLoginFalse = () => {
    setIsLogged(false);
  }

  const authValue = {
    isLogged,
    onLogout: onLoginFalse,
    onLogin: onLoginTrue
  }

  return (
    <AuthContext.Provider value={authValue}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adverts/*" element={isLogged ? <AdvertsPage /> : <Navigate to="/login" />}/>
          <Route path="/adverts/:id" element={isLogged ? <AdvertPage /> : <Navigate to="/login" />}/>
          <Route path="/adverts/new" element={isLogged ? <NewAdvertPage /> : <Navigate to="/login" />}/>
          <Route path="/404" element={isLogged ? <NotFoundPage /> : <Navigate to="/login" />} />
          <Route path="*" element={isLogged ? <NotFoundPage /> : <Navigate to="/login" />} />
        </Routes>
    
    </AuthContext.Provider>
  );
}

export default App;
