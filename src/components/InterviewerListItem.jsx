import React from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { id, name, avatar, setInterviewer, selected } = props;
  
  const interviewerClass = classNames(
    'interviewers__item',
    {'interviewers__item--selected': selected}
  );

  return (
    <li onClick={() => setInterviewer(id)} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}