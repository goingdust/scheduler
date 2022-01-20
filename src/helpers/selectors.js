const getAppointmentsForDay = (state, day) => {
  const matchingDay = state.days.filter(oneDay => oneDay.name === day)[0] || [];
  
  return matchingDay.appointments ? matchingDay.appointments.map(apptId => {
    return state.appointments[apptId];
  }) : matchingDay;
};

export default getAppointmentsForDay;