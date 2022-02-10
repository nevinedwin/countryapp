import React, { useState } from 'react';
import '../Assets/Styles/pagination.css'
import { FaStar, FaInfoCircle } from 'react-icons/fa'
import { StateDetails } from '../Core/Context';
import { useContext } from 'react';

const Pagination = (props) => {

    const stateDetails = useContext(StateDetails)

    const fav = (id) => {
        let flag = 0
        stateDetails.state.favourites.forEach(element => {
            if (element.id === id) {
                flag = 1
            }
        })
        return flag
    }
    return (
        <>
            {props.countries.map((each) => {
                return (
                    <div key={each.id} className='card' >
                        <div className='card-heading'>
                            {each.abbr3}
                        </div>
                        <ul className='list-items'>
                            <li className='head-card'>{each.altName}</li>
                            <li>Id: {each.id}</li>
                            <li>altName : {each.name}</li>
                            <li>Currency : {each.currencyName}</li>
                            <li>Currency symbol : {each.currencySymbol}</li>
                        </ul>
                        <div className='icon-container'>
                            <FaStar className={fav(each.id) === 1 ? 'fill-fav-icon' : 'fav-icon'} onClick={() => props.addCountry(each.id)} />
                            <FaInfoCircle className='fav-icon' onClick={() => props.selectCard(each.id)} />
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default Pagination;
