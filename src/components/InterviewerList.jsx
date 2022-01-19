import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem
      key={interviewer.id}
      setInterviewer={() => onChange(interviewer.id)}
      selected={interviewer.id === value}
      name={interviewer.name}
      avatar={interviewer.avatar}
      />
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}