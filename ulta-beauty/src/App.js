// import './App.css';
import Search from './components/search';

import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Route path='/' exact component={Search} />
      <Redirect to="/" />
    </BrowserRouter>
)};

export default App;
