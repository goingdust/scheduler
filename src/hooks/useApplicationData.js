import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  // const [state, dispatch] = useReducer(reducer, 0);

  // const SET_DAY = "SET_DAY";
  // const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  // const SET_INTERVIEW = "SET_INTERVIEW";

  // const reducers = {
  //   setDay(state, action) {},
  //   setAppData(state, action) {},
  //   setInterview(state, action) {},
  //   default() {
  //     throw new Error(
  //       `Tried to reduce with unsupported action type: ${action.type}`
  //     );
  //   }
  // };

  // const reducer = (state, action) => {
  //   return reducers[action.type](state, action) || reducers.default();
  // }

  // // function reducer(state, action) {
  // //   switch (action.type) {
  // //     case SET_DAY:
  // //       return { /* insert logic */ }
  // //     case SET_APPLICATION_DATA:
  // //       return { /* insert logic */ }
  // //     case SET_INTERVIEW: {
  // //       return /* insert logic */
  // //     }
  // //     default:
  // //       throw new Error(
  // //         `Tried to reduce with unsupported action type: ${action.type}`
  // //       );
  // //   }
  // }


  const setDay = day => setState({ ...state, day });

  const updateSpots = (id, action = "book") => {
    const days = [...state.days];
    const appointments = { ...state.appointments };
    days.forEach(day => {
      day.appointments.forEach(apptId => {
        if (apptId === id) {
          let spots = day.spots;
          if (action === "cancel") {
            spots += 1;
          } else if (appointments[id].interview === null) {
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

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState(prevState => ({ ...prevState, appointments, days }));
    });
  };

  const cancelInterview = id => {
    const appointments = { ...state.appointments };
    appointments[id] = { id, time: appointments[id].time, interview: null };

    const days = updateSpots(id, "cancel");

    return axios.delete(`/api/appointments/${id}`).then(() => {
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
