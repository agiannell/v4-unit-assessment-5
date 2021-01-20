import React from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './App.css';

function App() {
  return (
    <div className='App'>
      { routes }
      <Nav />
    </div>
  )
};

export default App;
