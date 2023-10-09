import * as React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import SearchDestination from './components/searchDestination'
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Header from './components/header';
import app from './config'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'

const App: React.FC = () => {
  const [user, setUser] = React.useState<null |User>(null);
  const authentication = getAuth(app)
  React.useEffect(() => {
    onAuthStateChanged(authentication, user => {
        if (user) {
          setUser(user)
        }
        else {
          setUser(null)
        }
      })
  }, []);
  
  return (
    <BrowserRouter>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Home user={user}/>} />
        <Route
          path="/login"
          element={<Login/>}
        />
         <Route
          path="/signup"
          element={<Signup/>}
        />
        <Route
          path="/places"
          element={<SearchDestination />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
