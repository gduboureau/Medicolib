import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { accountService } from "../users/Authentification/Sessionstorage";
import moment from 'moment';
import 'moment/locale/fr';
import Error from "../../utils/Error";

const Booking = () => {

  let mail = accountService.getEmail();

  const { name } = useParams();

  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      axios.get(`/${name}/booking`).then((res) => {
        const newData = res.data;
        setAppointmentList(newData);
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
    axios
      .post("/makeappointment", { id, mail })
      .then((response) => {
        navigate("/patient/appointments");
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div>
      <p>Choisissez la date de la consultation</p>
      <div>
        <button onClick={() => {
          const date = new Date();
          if (selectedWeek.getTime() - 7 >= date.getTime()) {
            setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() - 7))
          }
        }
        }
        >Semaine précédente</button>
        <button onClick={() => setSelectedWeek(new Date(selectedWeek.getFullYear(), selectedWeek.getMonth(), selectedWeek.getDate() + 7))}>Semaine suivante</button>
      </div>
      <table>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>{moment(day).format('dddd D MMMM')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDays.map((day, indexD) => (
              <td key={indexD}>
                {groupedAppointments[`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`]?.map((appointment, index) => (
                  <button style={{ cursor: 'pointer' }} className="doctor-card" key={index} onClick={() => onClick(appointment[0])}>
                    <p>{appointment[3]}</p>
                  </button>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
