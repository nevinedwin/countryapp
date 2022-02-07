import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import { routes } from './Core/Routes'
import StateProvider from './Core/Context';




function App() {

  return (
    <Router>
      <StateProvider>
        <Routes>
          {
            routes.map(route => {
              return (
                <Route key={route.path} path={route.path} element={<route.component/>} />
              )
            })

          }
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
