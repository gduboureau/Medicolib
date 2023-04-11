import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { accountService } from "../users/Authentification/Sessionstorage";
import moment from 'moment';
import 'moment/locale/fr';
import Error from "../../utils/Error";
import './assets/booking.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";


const Booking = () => {

  let mail = accountService.getEmail();

  const { name } = useParams();

  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (name) {
      axios.get(`/${name}/booking`).then((res) => {
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
        setSelectedWeek(new Date(filteredData[0][2]))
      })
        .catch((error) => {
          console.log(error)
          setHasError(true);
        });
    }
  }, [name]);

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

  const weekEnd = new Date(selectedWeek);
  weekEnd.setDate(selectedWeek.getDate() - selectedWeek.getDay() + 6);

  const weekDays = [];
  for (let i = 1; i < 7; i++) {
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
    <div className="BookingAppt">
      <div className="div-table-booking">
        <table className="table-booking">
          <thead>
            <tr>
              <td>
                <button className="button-week-left" onClick={() => {
                  const date = new Date();
                  if (selectedWeek.getTime() - 7 >= date.getTime()) {
                    setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() - 7))
                  }
                }}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
              </td>
              {weekDays.map((day) => (
                <th key={day}>{moment(day).format('dddd D MMMM')}</th>
              ))}
              <td>
                <button className="button-week-right" onClick={() =>
                  setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 7))
                }>
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </td>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {weekDays.map((day, indexD) => (
                <td key={indexD} className="cell-day">
                  {groupedAppointments[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]?.map((appointment, index) => (
                    <div key={index}>
                      <button className={appointment[5] === "false" ? "not-booked" : "booked"} onClick={() => {
                        if (appointment[5] === "false") {
                          onClick(appointment[0]);
                        }
                      }}>
                        <div>
                          <p>{appointment[3]}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
