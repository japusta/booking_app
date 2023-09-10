import React from 'react'
import { Link } from 'react-router-dom'
import "./searchItem.css"

const SearchItem = ({item}) => {
  return (
    <div className='search-item'>
        <img src={item.photos[0]} alt="" className="search-item__img" />

        <div className="search-item__desc">
            <h1 className="search-item__desc-title">{item.name}</h1>
            <span className="search-item__desc-dist">{item.distance}m from center</span>
            <span className="search-item__desc-taxi-op">Free airport taxi</span>

            <span className="search-item__desc-subtitle">
                Studio Apartment with Air conditioning
            </span>

            <span className="search-item__desc-features">
                {item.desc}
            </span>

            <span className="search-item__desc-cancel-op">Free cancellation </span>

            <span className="search-item__desc-cancel-op-subtitle">
                You can cancel later, so lock in this great price today!
            </span>
        </div>

        <div className="search-item__details">
            {item.rating  && <div className="search-item__details-rating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}

            <div className="search-item__details-text">
                <span className="search-item__details-price">${item.cheapestPrice}</span>
                <span className="search-item__details-tax-op">Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                    <button className="search-item__details-check-button">See availability</button>
                </Link>
            </div>

        </div>
    </div>
    
  )
}

export default SearchItem