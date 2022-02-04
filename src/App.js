import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {routes} from './Core/Routes'

function App() {

  
  return (
    <Router>
      <Routes>
        {
          routes.map(route=>{
            return(
              <Route key={route.path} path={route.path} element={<route.component/>}/>
            )
          })

        }
      </Routes>
    </Router>
  );
}

export default App;
