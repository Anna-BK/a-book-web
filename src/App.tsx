import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isLoggedInVar } from './apollo';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';

function App() {

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Routes>
      <Route path='/'>
        <Route index element={
          <RequireAuth><Home /></RequireAuth>
        } />
         {/* 로그인 한 경우 로그인 페이지 띄우지 않음 */}
        <Route path='login' element={(isLoggedIn? <Navigate to="/"/> : <Login />)} />
      </Route>
    </Routes>
  );
}

export default App;


function RequireAuth({ children }: { children: JSX.Element }) {

  let location = useLocation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);


  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}