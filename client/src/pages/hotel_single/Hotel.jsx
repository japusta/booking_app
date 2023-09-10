import React, { useContext, useState } from 'react'
import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mail_list/MailList"
import Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchContext } from '../../context/searchContext'
import { DateRange } from 'react-date-range';
import { AuthContext } from '../../context/authContext'
import Reserve from '../../components/reserve/Reserve'


export const Hotel = () => {
  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()


  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false);

  const {data,loading,error,reFetch} = useFetch(`http://localhost:8800/api/hotels/find/${id}`)

  const {dates, options} = useContext(searchContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;


  const dayDifference = (date1, date2)=>{
    const timeDiff = Math.abs(Date.parse(date2) - Date.parse(date1));
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  //console.log(dates)



  

  const handleOpen = (index) => {
    setSlideNumber(index)
    setOpen(true)

  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } 
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const HandleReserve = () => {
    if(user){
      setOpenModal(true)
    }
    else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? ("loading,please wait") : <div className="hotel-container">

        {open && (<div className="hotel-slider">
        <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="slider-wrapper">
              <img src={data.photos[slideNumber]} alt="" className="slider-img" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
        </div>)}

        <div className="hotel-container__wrapper">
          <button className='hotel-container__button'>Reserve or Book Now!</button>
          <h1 className="hotel-container__title">{data.name}</h1>
          <div className="hotel-container__address">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>
          <span className='hotel-container__distance'>Excellent location - {data.distance}m from center</span>
          <span className='hotel-container__price'>Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>

          <div className="hotel-container__imgs">
            {data.photos?.map((photo,index) => (
              <div className="hotel-container__imgs-wrapper" key={index}>
                <img onClick={() => handleOpen(index)} src={photo} alt="" className='hotel-container__img'/>
              </div>
            ))}
          </div>

          <div className="hotel-container__details">
            <div className="hotel-container__details-text">
              <h1 className="hotel-container__details-title">{data.title}</h1>
              <p className="hotel-container__desc">
                {data.desc}
              </p>
            </div>

            <div className="hotel-container__details-price">
              <h1>Perfect for a {days}-night stay!</h1>

              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>

              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>

              <button onClick={HandleReserve}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId = {id}/>}
    </div>
  )
}

export default Hotel
