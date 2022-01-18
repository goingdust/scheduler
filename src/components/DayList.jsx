import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, setDay } = props;
  const parsedDayListItems = days.map(day => {
  return <DayListItem key={day.id} setDay={setDay} day={props.day} {...day} />;
  });

  return (
    <ul>
      { parsedDayListItems }
    </ul>
  );
}