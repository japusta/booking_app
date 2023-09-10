import React from 'react'
import useFetch from '../../hooks/useFetch'
import "./featuredProps.css"

const FeaturedProps = () => {
    const {data,loading,error} = useFetch("http://localhost:8800/api/hotels?featured=true&limit=4")


    return (
        <div className='featured-properties'>
            {loading ? "Loading please wait" : <>

            {data.map(item => (<div className="featured-properties__item">
                <img  className="featured-properties__img" src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1" alt=""/>
                <span className="featured-properties__name">{item.name}</span>
                <span className="featured-properties__city">{item.city}</span>
                <span className="featured-properties__price">Starting from ${item.cheapestPrice}</span>
                {item.rating &&<div className="featured-properties__rating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                </div>}
            </div>))  }
            </>}
        </div>

        
        
    )
}

export default FeaturedProps