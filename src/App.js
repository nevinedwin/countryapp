import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './Core/Routes'
import { getCountryDetails } from './CommonServices/services';
export const CountryDetails = React.createContext()

function App() {

  const [apiDetails, setApiDetails] = useState({})

  useEffect(() => {
    getCountryDetails().then(res => (
      setApiDetails(res.data)
    ));
  }, [])

  return (
    <CountryDetails.Provider value={apiDetails}>
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
    </CountryDetails.Provider>
  );
}

export default App;
