const getAppointmentsForDay = (state, day) => {
  const matchingDay = state.days.filter(oneDay => oneDay.name === day)[0] || [];
  
  return matchingDay.appointments ? matchingDay.appointments.map(apptId => {
    return state.appointments[apptId];
  }) : matchingDay;
};

const getInterviewersForDay = (state, day) => {
  const matchingDay = state.days.filter(oneDay => oneDay.name === day)[0] || [];
  
  return matchingDay.interviewers ? matchingDay.interviewers.map(interviewerId => {
    return state.interviewers[interviewerId];
  }) : matchingDay;
};

const getInterview = (state, interview) => {
  if (interview) {
    return {
      interviewer: state.interviewers[interview.interviewer],
      student: interview.student
    }
  }
  return null;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };