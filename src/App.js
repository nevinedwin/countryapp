import React from 'react';
import './app.css';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import { routes } from './core/routes'
import StateProvider from './core/context';
import { AppRoute } from './core/appRoute';




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
