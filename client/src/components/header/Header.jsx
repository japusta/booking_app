import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./header.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {useState} from 'react'
import {format } from "date-fns"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { searchContext } from '../../context/searchContext';
import { AuthContext } from '../../context/authContext';

export const Header = ({type}) => {

    const [openDate, setOpenDate] = useState("")
    const [destination, setDestination] = useState(false)

    const [dates, setDates] = useState([
    {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
    }
    ]);

    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult:1,
        children:1,
        room:1,
    })

    const navigate =useNavigate()

    const handleOption = (name, operation) => {
        setOptions(prev => {return{
            ...prev, 
            [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
        }})
    }

    const {dispatch} = useContext(searchContext)

    const {user} = useContext(AuthContext)


    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{destination,dates,options}})
        navigate("/hotels", {state:{destination,dates,options}})
    }

    return (
        <div className="header">
            <div className= {type === "list" ? "header-container list-mode" : "header-container"}>
                <div className="header-container__list">
                    <div className="header-container__list-item active">
                        <FontAwesomeIcon icon={faBed} className="header-icon"/>
                        <span>Stays</span>
                    </div>
                    <div className="header-container__list-item">
                        <FontAwesomeIcon icon={faPlane} className="header-icon"/>
                        <span>Flights</span>
                    </div>
                    <div className="header-container__list-item">
                        <FontAwesomeIcon icon={faCar} className="header-icon"/>
                        <span>Car rentals</span>
                    </div>
                    <div className="header-container__list-item">
                        <FontAwesomeIcon icon={faBed} className="header-icon"/>
                        <span>Attractions</span>
                    </div>
                    <div className="header-container__list-item">
                        <FontAwesomeIcon icon={faTaxi} className="header-icon"/>
                        <span>Airport taxis</span>
                    </div>

                    
                </div>

                { type !== "list" &&
                <>  <h1 className="header-title">A lifetime of discounts? It's Genius.</h1>
                    <p className="header-desc">Get rewarder for your travels - unlock instant savings of 10% or more with a free lamabooking account</p>
                    {!user && <button className="header-button">Sign in / Register</button>}

                    <div className="header-search">
                        <div className="header-search__item">
                        <FontAwesomeIcon icon={faBed} className="header-icon"/>
                        <input type="text" placeholder="Where are you going?" className='header-search__input' onChange={e => setDestination(e.target.value)}/>
                        </div>

                        <div className="header-search__item">
                        <FontAwesomeIcon icon={faCalendarDays} className="header-icon"/>
                        <span onClick={() => setOpenDate(!openDate)} className="header-search__text">{`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
                        {openDate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="header-search__date"
                        minDate = {new Date()}
                        />}
                        </div>

                        <div className="header-search__item">
                            <FontAwesomeIcon icon={faPerson} className="header-icon"/>
                            <span onClick={() => setOpenOptions(!openOptions)} className="header-search__text">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span> 
                            {openOptions && (
                            <div className="header-search__options">
                                <div className="header-search__options-item">
                                    <span className="options-item__text">Adult</span>
                                    <div className="options-item__counter">
                                        <button disabled={options.adult <= 1} className="options-item__button" onClick={() => handleOption("adult", "dec")}>-</button>
                                        <span className="options-item__number">{options.adult}</span>
                                        <button className="options-item__button" onClick={() => handleOption("adult", "inc")}>+</button>
                                    </div>
                                </div>

                                <div className="header-search__options-item">
                                    <span className="options-item__text">Children</span>
                                    <div className="options-item__counter">
                                        <button disabled={options.children <= 0} className="options-item__button" onClick={() => handleOption("children", "dec")}>-</button>
                                        <span className="options-item__number">{options.children}</span>
                                        <button className="options-item__button" onClick={() => handleOption("children", "inc")}>+</button>
                                    </div>
                                </div>

                                <div className="header-search__options-item">
                                    <span className="options-item__text">Room</span>
                                    <div className="options-item__counter">
                                        <button  disabled={options.room <= 1} className="options-item__button" onClick={() => handleOption("room", "dec")}>-</button>
                                        <span className="options-item__number">{options.room}</span>
                                        <button className="options-item__button" onClick={() => handleOption("room", "inc")}>+</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        
                        

                        <div className="header-search__item">
                        <button className="header-button" onClick={handleSearch}>Search</button>               
                        </div>
                    </div>
                </> }
            </div>
        </div>
        )
}

export default Header
