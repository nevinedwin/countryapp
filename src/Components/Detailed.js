import React from 'react';
import {FaArrowLeft} from 'react-icons/fa'

const Detailed = ({detailedView, handleArrow}) => {
  return (
    <div className='card-big'>
    <div className='card-header'>
      <div className='arrow-body'>
        <FaArrowLeft className='arrow' onClick={handleArrow}/>
        <p>Country Details</p>
      </div>
      <div className='below-arrow'>
      <h2 className='text-card'>{detailedView.abbr3}</h2>
      </div>
    </div>
    <div className='card-body'>
      <div className='body-heading'>
        <h3>{detailedView.altName}</h3>
      </div>
      <div className='body-footer'>
          <ul>
            <li>{detailedView.id} is the Id</li>
            <li>Abbreviation of {detailedView.altName} is {detailedView.abbr3}</li>
            <li>{detailedView.altName} is situated in {detailedView.continent} continent.</li>
            <li>{detailedView.distanceUnits} is the distance Unit.</li>
            <li>{detailedView.esriUnits} is the ESRIUnits.</li>
              <h4>Hierarchies</h4>
            <ul>
              <li>Id is {detailedView.hierarchies[0].ID}.</li>
              <li>Alias : {detailedView.hierarchies[0].alias}.</li>
              <li>Population to Polygon Size Rating is : {detailedView.hierarchies[0].populationToPolygonSizeRating}.</li>
            </ul>
            <h4>Currencies</h4>
            <ul>
              <li>{detailedView.currencyCode} is the currency code.</li>
              <li>{detailedView.currencyName} is the currency name.</li>
              <li>{detailedView.currencySymbol} is the currency Symbol.</li>
              <li>{detailedView.currencyFormat} is the currency Format.</li>
            </ul>
          </ul>
      </div>
    </div>

  </div>
  )
};

export default Detailed;
