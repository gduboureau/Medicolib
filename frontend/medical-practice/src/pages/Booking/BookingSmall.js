import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { accountService } from "../users/Authentification/Sessionstorage";
import moment from 'moment';
import 'moment/locale/fr';
import Error from "../../utils/Error";
import './assets/bookingSmall.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";

const BookingSmall = (selectedDoctorId) => {

  let mail = accountService.getEmail();

  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [hasError, setHasError] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState({});


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      axios.get(`/booking/id=${selectedDoctorId['selectedDoctorId']}`).then((res) => {
        const newData = res.data;
        const tmp = newData;
        const filteredData = tmp.filter(appointment => appointment[5] === "false");
        filteredData.sort((a, b) => {
          const dateA = new Date(a[2]);
          const dateB = new Date(b[2]);
          return dateA - dateB;
        });
        filteredData.sort((a, b) => {
          const dateA = new Date(a[2]);
          const dateB = new Date(b[2]);
          return dateA - dateB;
        });
        setAppointmentList(newData);
        setSelectedWeek(new Date(filteredData[0][2]));
        setShowTimeSlots(Array(6).fill(false));
      })
        .catch((error) => {
          console.log(error)
          setHasError(true);
        });
  }, [selectedDoctorId]);

  if (hasError) {
    return <Error />;
  }

  const onClick = (id) => {
    if (!accountService.isLogged()){
      navigate("/login", { state: { prevS: location.pathname, prevA: location.search } });
    }else{
      axios
      .post("/makeappointment", { id, mail })
      .then((response) => {
        navigate("/patient/appointments");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const weekStart = new Date(selectedWeek);
  weekStart.setDate(selectedWeek.getDate() - selectedWeek.getDay());

  const weekDays = [];
  for (let i = 1; i < 6; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    weekDays.push(day);
  }

  const groupedAppointments = {};
  appointmentList.forEach((appointment) => {
    const date = new Date(appointment[2]);
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (!groupedAppointments[dateKey]) {
      groupedAppointments[dateKey] = [];
    }
    groupedAppointments[dateKey].push(appointment);
  });


  return (
      <div className="BookingApptSmall">
          <div className="booking-header">
            <button className="previous-week-btn" onClick={() => {
                const date = new Date();
                if (selectedWeek.getTime() - 7 >= date.getTime()) {
                  setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() - 7))
                }
              }}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button className="next-week-btn" onClick={() =>
                setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 7))
              }>
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
          </div>
          <div className="booking-body">
              {weekDays.map((day, index) => (
                  <div className="booking-day" key={index}>
                      <div className="days-container" onClick={() => setShowTimeSlots((prevShowTimeSlots) => ({ ...prevShowTimeSlots, [index]: !prevShowTimeSlots[index] }))}>
                        <h3>{moment(day).format("dddd D MMMM")}</h3>
                        <span className="arrow"><FontAwesomeIcon icon={faAngleDown} /></span>
                      </div>
                      <div className={`booking-time-slot ${!showTimeSlots[index] && "hidden"}`}>
                          <div className="timeslot-container">
                          {groupedAppointments[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]?.map((appointment, index) => (
                              <button
                                  key={index}
                                  className={appointment[5] === "false" ? "not-booked" : "booked"}
                                  onClick={() => { if (appointment[5] === "false") { onClick(appointment[0]); } }}
                              >
                                  <div>
                                      <p>{appointment[3]}</p>
                                  </div>
                              </button>
                          ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
          <div className="booking-footer"></div>
      </div>
  );
};

export default BookingSmall;
