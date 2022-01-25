import React from "react";

import { render, waitForElement } from "@testing-library/react";

import Application from "components/Application";

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"));
});
