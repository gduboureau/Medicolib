import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { accountService } from "../users/Authentification/Sessionstorage";
import moment from 'moment';
import 'moment/locale/fr';
import Error from "../../utils/Error";
import './assets/booking.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";

const Booking = (selectedDoctorId) => {
  function NoRDVModal(props) {
    const handleClose = () => {
      props.onClose();
    };

    return (
      <div className="modal-overlay">
        <div className="modal">
          <p>{props.title}</p>
          <div className="modal-buttons">
            <button onClick={handleClose}>Fermer</button>
          </div>
        </div>
      </div>
    );
  }

  let mail = accountService.getEmail();

  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        setSelectedWeek(new Date(filteredData[0][2]))
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
    if (!accountService.isLogged()) {
      navigate("/login", { state: { prevS: location.pathname, prevA: location.search } });
    } else {
      axios
        .post("/makeappointment", { id, mail })
        .then((response) => {
          navigate("/patient/appointments");
        })
        .catch((error) => {
          console.log(error);
          setSelectedAppointment(true)
        });
    }
  };

  const weekStart = new Date(selectedWeek);
  weekStart.setDate(selectedWeek.getDate() - selectedWeek.getDay());

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

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  }

  return (
    <div className="BookingAppt">
        <table className="table-booking">
          <thead>
            <tr>
              <th className="empty-cell">
                <button className="button-week-left" onClick={() => {
                  const today = new Date();
                  today.setHours(0);
                  today.setMinutes(0);
                  today.setSeconds(0);
                  today.setMilliseconds(0);
                  const previousWeek = new Date(selectedWeek);
                  previousWeek.setDate(selectedWeek.getDate() - 7);
                  if (previousWeek >= today) {
                    setSelectedWeek(previousWeek);
                  }
                }}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
              </th>
              {weekDays.map((day) => (
                <th key={day}>{moment(day).format('dddd D MMMM')}</th>
              ))}
              <th className="empty-cell">
              <button className="button-week-right" onClick={() =>
                setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 7))
              }>
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </th> 

            </tr>
          </thead>
          <tbody>
              <td/>
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
          </tbody>
        </table>
      {selectedAppointment && (
        <NoRDVModal
          title="Nous sommes désolés mais ce rendez-vous n'est plus disponible."
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Booking;
