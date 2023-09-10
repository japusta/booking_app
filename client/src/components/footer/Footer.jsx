import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer__lists">
            <ul className="footer__list">
                <li className="footer__list-item">Countries</li>
                <li className="footer__list-item">Regions</li>
                <li className="footer__list-item">Cities</li>
                <li className="footer__list-item">Districts</li>
                <li className="footer__list-item">Airports</li>
                <li className="footer__list-item">Hotels</li>
            </ul>

            <ul className="footer__list">
                <li className="footer__list-item">Homes </li>
                <li className="footer__list-item">Apartments </li>
                <li className="footer__list-item">Resorts </li>
                <li className="footer__list-item">Villas</li>
                <li className="footer__list-item">Hostels</li>
                <li className="footer__list-item">Guest houses</li>
            </ul>

            <ul className="footer__list">
                <li className="footer__list-item">Unique places to stay </li>
                <li className="footer__list-item">Reviews</li>
                <li className="footer__list-item">Unpacked: Travel articles </li>
                <li className="footer__list-item">Travel communities </li>
                <li className="footer__list-item">Seasonal and holiday deals </li>
            </ul>

            <ul className="footer__list">
                <li className="footer__list-item">Car rental </li>
                <li className="footer__list-item">Flight Finder</li>
                <li className="footer__list-item">Restaurant reservations </li>
                <li className="footer__list-item">Travel Agents </li>
            </ul>

            <ul className="footer__list">
                <li className="footer__list-item">Curtomer Service</li>
                <li className="footer__list-item">Partner Help</li>
                <li className="footer__list-item">Careers</li>
                <li className="footer__list-item">Sustainability</li>
                <li className="footer__list-item">Press center</li>
                <li className="footer__list-item">Safety Resource Center</li>
                <li className="footer__list-item">Investor relations</li>
                <li className="footer__list-item">Terms & conditions</li>
            </ul>
        </div>

        <p> Copyright &copy; 2023 ABCbooking</p>

    </div>
  )
}

export default Footer