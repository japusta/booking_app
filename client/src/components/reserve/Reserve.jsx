import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchContext } from '../../context/searchContext'
import useFetch from '../../hooks/useFetch'
import "./reserve.css"

const Reserve = ({setOpen,hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const { dates } = useContext(searchContext);

    const getDatesInRange = (startDate,endDate) => {
        const start = new Date (startDate)
        const end = new Date(endDate)

        const date = new Date(start.getTime())

        const dates = []

        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }

    console.log(getDatesInRange(dates[0].startDate, dates[0].endDate));

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
      };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
        checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
        await Promise.all(
            selectedRooms.map((roomId) => {
            const res = axios.put(`/rooms/availability/${roomId}`, {
                dates: alldates,
            });
            return res.data;
            })
        );
        setOpen(false);
        navigate("/");
        } catch (err) {}
    };
    console.log(selectedRooms);

    return (
        <div className='reserve'>
            <div className="reserve-container">
                <FontAwesomeIcon icon={faCircleXmark} className="reserve-close" onClick={() => setOpen(false)}/>
                <span>Select your rooms:</span>
                {data.map(item => (
                    <div className="reserve-item">
                        <div className="reserve-item__info">
                            <div className="reserve-item__title">{item.title}</div>
                            <div className="reserve-item__desc">{item.desc}</div>
                            <div className="reserve-item__max">Max people: <b>{item.maxPeople}</b></div>
                            <div className="reserve-item__price">{item.price}</div>
                        </div>
                        <div className="reserve-item__select-rooms">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
                <button onClick={handleClick} className='reserve-button'>Reserve Now</button>
            </div>
        </div>
    )
}

export default Reserve