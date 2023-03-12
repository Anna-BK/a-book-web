import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isLoggedInVar } from './apollo';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';


function App() {

  return (
    <Routes>
      <Route path='/'>
        <Route index element={
          <RequireAuth><Home /></RequireAuth>
        } />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;


function RequireAuth({ children }: { children: JSX.Element }) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  let location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}