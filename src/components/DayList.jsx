import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
  const parsedDayListItems = days.map(day => {
  return <DayListItem
    key={day.id}
    setDay={onChange}
    selected={day.name === value}
    name={day.name}
    spots={day.spots}
    />;
  });

  return (
    <ul>
      { parsedDayListItems }
    </ul>
  );
}