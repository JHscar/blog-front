import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from './Nav';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import Login from './Login';
import Post from './Post';
import Join from './Join';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = {
    isAdmin,
    setIsAdmin,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <BrowserRouter>
      <Nav {...auth} />
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/post/:id" component={Post} />
      <Route path="/join" component={Join} />
      <Footer />
    </BrowserRouter>
  );
}
