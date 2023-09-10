import React from 'react'
import Featured from '../../components/featured/Featured'
import FeaturedProps from '../../components/featured_properties/FeaturedProps'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mail_list/MailList'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from '../../components/property_list/PropertyList'
import "./home.css"

export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="home-container">
          <Featured/>
          <h1 className="home-title">Browse by property type</h1>
          <PropertyList/>
          <h1 className='home-title'>Homes guests love</h1>
          <FeaturedProps/>
          <MailList/>
          <Footer/>
        </div>
    </div>
  )
}
export default Home
