import React, { useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Header from '../../components/header/Header'
import "./list.css"
import { useLocation } from 'react-router-dom'
import {format } from "date-fns"
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/search_item/SearchItem'
import useFetch from '../../hooks/useFetch'

export const List = () => {
  const location = useLocation()
  const [destination,setDestionation] =useState (location.state.destination)
  const [dates,setDates] =useState (location.state.dates)
  const [openDate,setOpenDate] =useState (false)
  const [options,setOptions] =useState (location.state.options)
  const [min,setMin] =useState (undefined)
  const [max,setMax] =useState (undefined)


  const {data,loading,error,reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
  
  const handleClick = () => {
    reFetch()
  }

  
  return (
    <div>
        <Navbar/>
        <Header type = "list"/>
        <div className="list__container">
          <div className="list__container-wrapper">
            <div className="list__container-search">
              <h1 className="search-title">Search</h1>
              <div className="list-item">
                <label htmlFor="">Destination</label>
                <input type="text" placeholder={destination}/>
              </div>

              <div className="list-item">
                <label htmlFor="">Check-in date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
                {openDate && (<DateRange
                onChange={item => setDates([item.selection])} minDate = {new Date()} ranges={dates}
                />)}
              </div>

              <div className="list-item">
                <label>Options</label>

                <div className="list-item__options">

                  <div className="list-item__option">
                    <span className="list-item__option-text">
                      Min price <small>per night</small>
                    </span>
                    <input type="number" onChange={e => setMin(e.target.value)} className="list-item__option-input" />
                  </div>

                  <div className="list-item__option">
                    <span className="list-item__option-text">
                      Max price <small>per night</small>
                    </span>
                    <input type="number" onChange={e => setMax(e.target.value)} className="list-item__option-input" />
                  </div>

                  <div className="list-item__option">
                    <span className="list-item__option-text">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="list-item__option-input"
                      placeholder={options.adult}
                    />
                  </div>

                  <div className="list-item__option">
                    <span className="list-item__option-text">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="list-item__option-input"
                      placeholder={options.children}
                    />
                  </div>

                  <div className="list-item__option">
                    <span className="list-item__option-text">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="list-item__option-input"
                      placeholder={options.room}
                    />
                  </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          
            <div className="list__container-result">
              {loading ? ("loading,please wait") : 
              <>
              {data.map(item=>(
              <SearchItem item={item} key={item._id}/>
              ))}
              </>}
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default List