import React from "react";
import classNames from "classnames";

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames(
    'day-list__item',
    {'day-list__item--selected': selected},
    {'day-list__item--full': !spots}
  );

  const formatSpots = (spots) => {
    if (spots > 1) {
      return `${spots} spots`;
    } else if (spots === 1) {
      return  '1 spot';
    } else if (spots === 0) {
      return 'no spots';
    }
  };

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}