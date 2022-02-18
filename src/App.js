import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import { routes } from './Core/Routes'
import StateProvider from './Core/Context';
import { AppRoute } from './Core/AppRoute';




function App() {

  return (
    <Router>
      <StateProvider>
        <Routes>
          {
            routes.map(route=>{
              return(<Route 
                key={route.path}
                path={route.path}
                element={<AppRoute path={route.path} component={route.component} isPrivate={route.isPrivate}/>}
                />)
            })
          }
        </Routes>
      </StateProvider>
    </Router>
  );
}

export default App;
