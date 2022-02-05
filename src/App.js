import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './Core/Routes'
import StateProvider from './Core/Context';




function App() {

  return (
    <StateProvider>
      <Router>
        <Routes>
          {
            routes.map(route => {
              return (
                <Route key={route.path} path={route.path} element={<route.component />} />
              )
            })

          }
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
