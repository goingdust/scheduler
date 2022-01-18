import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer } = props;

  const parsedInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem
      key={interviewer.id}
      setInterviewer={setInterviewer}
      interviewer={props.interviewer}
      {...interviewer}
      />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
}