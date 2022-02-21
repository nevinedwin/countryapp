import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ManageLocalStorage from '../../commonServices/manageLocalStorage';
import { checkValue, getCountriesById, removeArray } from '../../commonServices/services';
import Detailed from '../../components/detailed';
import Hoc from '../../components/hoc';
import Pagination from '../../components/pagination';
import { ACTION, StateDetails } from '../../core/context';
import './favourites.css'

const Favourites = () => {

    const stateDetails = useContext(StateDetails)

    const [statecountries, setStateCountries] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsPerPage, setCardsPerPage] = useState(5)
    const [indexofLastCard, setIndexOfLastCard] = useState(5)
    const [indexofFirstCard, setIndeOfFirstCard] = useState(0)
    const [pageNumber, setPageNumber] = useState([])
    const [showCountry, setShowCountry] = useState(false)
    const [detailedView, setDetailedView] = useState({})

    useEffect(()=>{
        setStateCountries(stateDetails.state.favourites)
        setIndeOfFirstCard(0)
        setIndexOfLastCard(5)
        setCurrentPage(1)
        let fav = JSON.parse(ManageLocalStorage.get('allFavourites'))
        let currentUserr = stateDetails.state.currentUser.email
        ManageLocalStorage.set('allFavourites', {
          ...fav, 
          [currentUserr] : stateDetails.state.favourites})
    },[stateDetails])

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
          flag = checkValue(stateDetails.state.favourites, id)
        }
    
        if (flag === 0) {
          let newArr = removeArray(stateDetails.state.favourites, id)
          stateDetails.dispatch({ type: ACTION.FAVOURITES, payload: newArr })
        }
    
        if (flag === 1) {
          let newCountries = getCountriesById(id, stateDetails.state.countryDetails)
          stateDetails.dispatch({ type: ACTION.FAVOURITESADD, payload: newCountries })
        }
      }

      const selectCard = (id) => {
        let val = getCountriesById(id, stateDetails.state.countryDetails)
        setDetailedView(val)
        setShowCountry(true)
      }

      const handleArrow = ()=>{
        setShowCountry(false)
      }
    

    return (
        <>  {statecountries.length=== 0 && <h1 className='NoFav'>Oops..! No Favourites</h1>}
            <div className='home'>
            {showCountry && <>
            <Detailed detailedView={detailedView} handleArrow={handleArrow}/>
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
        </>
    )
};

export default Hoc(Favourites);
