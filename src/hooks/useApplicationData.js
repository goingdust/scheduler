import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = (id, action = "book") => {
    const days = [...state.days];
    days.forEach(day => {
      day.appointments.forEach(apptId => {
        if (apptId === id) {
          let spots = day.spots;
          if (action === "cancel") {
            spots += 1;
          } else {
            spots -= 1;
          }
          day.spots = spots;
        }
      });
    });
    return days;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(id);

    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      console.log(res);
      setState(prevState => ({ ...prevState, appointments, days }));
    });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(id, "cancel");

    return axios.delete(`/api/appointments/${id}`).then(res => {
      console.log(res);
      setState(prevState => ({ ...prevState, appointments, days }));
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then(all => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prevState => ({
          ...prevState,
          days,
          appointments,
          interviewers,
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
