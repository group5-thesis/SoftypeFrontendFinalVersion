import React, { useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
const DatePicker = (props) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  return (
    <DateRangePicker
      showSelectionPreview={false}
      scroll
      onChange={(item) => setState([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
      direction="horizontal"
    />
  );
};

export default DatePicker;
