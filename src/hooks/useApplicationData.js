import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: action.value.appointments,
        days: action.value.days,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => dispatch({ type: "SET_DAY", value: day });

  const updateSpots = (state, appts) => {
    const days = JSON.parse(JSON.stringify(state.days));

    days.forEach(day => {
      let updatedSpots = 0;
      day.appointments.forEach(apptId => {
        for (const appt in appts) {
          if (apptId === appts[appt].id && appts[appt].interview === null) {
            updatedSpots += 1;
          }
        }
      });
      day.spots = updatedSpots;
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
    const days = updateSpots(state, appointments);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({ type: "SET_INTERVIEW", value: { appointments, days } });
    });
  };

  const cancelInterview = id => {
    const appointments = { ...state.appointments };
    appointments[id] = { id, time: appointments[id].time, interview: null };
    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: "SET_INTERVIEW", value: { appointments, days } });
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
        dispatch({
          type: "SET_APPLICATION_DATA",
          value: { days, appointments, interviewers },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
