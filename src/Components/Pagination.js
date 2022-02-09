import React, { useState } from 'react';
import '../Assets/Styles/pagination.css'
import { FaHeart } from 'react-icons/fa'
import { StateDetails } from '../Core/Context';
import { useContext } from 'react';

const Pagination = (props) => {

    const stateDetails = useContext(StateDetails)

    const fav = (id) => {
        stateDetails.state.favourites.forEach(element => {
            if (element.id === id) {
                return true
            }
        })
    }

    return (
        <>
            {props.countries.map((each) => {
                return (
                    <div key={each.id} className='card' >
                        <div className='card-heading' onClick={() => props.selectCard(each.id)}>
                            {each.abbr3}
                        </div>
                        <ul className='list-items' onClick={() => props.selectCard(each.id)}>
                            <li className='head-card'>{each.altName}</li>
                            <li>Id: {each.id}</li>
                            <li>altName: {each.name}</li>
                        </ul>
                        <div className='icon-container'>
                            <FaHeart className={fav(each.id) === true ? 'fill-fav-icon' : 'fav-icon'} onClick={() => props.addCountry(each.id)} />
                        </div>
                    </div>
                )
            })}
        </>
    );
};

export default Pagination;
