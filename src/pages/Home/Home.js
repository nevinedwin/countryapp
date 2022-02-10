import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import ManageLocalStorage from '../../CommonServices/ManageLocalStorage';
import { checkValue, getCountriesByContinent, getCountriesById, removeArray } from '../../CommonServices/services';
import Hoc from '../../Components/Hoc';
import Pagination from '../../Components/Pagination';
import { ACTION, StateDetails } from '../../Core/Context';
import './Home.css'

const Home = () => {

  const stateDetails = useContext(StateDetails)


  const [statecountries, setStateCountries] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(5)
  const [indexofLastCard, setIndexOfLastCard] = useState(5)
  const [indexofFirstCard, setIndeOfFirstCard] = useState(0)
  const [pageNumber, setPageNumber] = useState([])
  const [showCountry, setShowCountry] = useState(false)



  useEffect(() => {
    setStateCountries(getCountriesByContinent(stateDetails.state.continent, stateDetails.state.countryDetails))
    setIndeOfFirstCard(0)
    setIndexOfLastCard(5)
    setCurrentPage(1)
    stateDetails.state.favourites.length !== 0 && ManageLocalStorage.set('favourites', stateDetails.state.favourites)
  }, [stateDetails])

  useEffect(() => {
    let page = []
    for (let i = 1; i <= Math.ceil(statecountries.length / 5); i++) {
      page.push(i)
    }
    setPageNumber(page)
  }, [statecountries])

  useEffect(() => {
    setIndexOfLastCard(currentPage * cardsPerPage)
  }, [currentPage])

  useEffect(() => {
    setIndeOfFirstCard(indexofLastCard - cardsPerPage)
  }, [indexofLastCard])


  const addCountry = (id) => {
    let flag = 1
    if (stateDetails.state.favourites.length !== 0) {
      console.log(stateDetails);
      flag = checkValue(stateDetails.state.favourites, id)
      console.log('flag', flag)
    }

    if (flag === 0) {
      let newArr = removeArray(stateDetails.state.favourites, id)
      stateDetails.dispatch({ type: ACTION.FAVOURITES, payload: newArr })
    }

    if (flag === 1) {
      let newCountries = getCountriesById(id, stateDetails.state.countryDetails)
      console.log("object", newCountries);
      stateDetails.dispatch({ type: ACTION.FAVOURITESADD, payload: newCountries })
    }
  }

  const selectCard = (id) => {
    setShowCountry(true)
  }

  return (

    <div className='home'>
      {showCountry && <>
        <div className='card-big'>

        </div>
      </>}
      {showCountry === false && <>
        <div className='home-container'>
          <Pagination countries={statecountries.slice(indexofFirstCard, indexofLastCard)} addCountry={addCountry} selectCard={selectCard} />
        </div>
        <div className='pages'>
          {pageNumber.map((num) => {
            return (
              <div key={num} className={num === currentPage ? 'selected-button' : 'button-page'} onClick={() => setCurrentPage(num)}>
                {num}
              </div>
            )
          })}
        </div>
      </>}
    </div>
  );
};

export default Hoc(Home);
