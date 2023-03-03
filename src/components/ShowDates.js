import React from "react";
import { useState, useEffect } from "react";
import BarChart from "./BarChart";
console.log=function(){}

const ShowDates = (props) => {





  const arr = Object.keys(props.data);
  const [scheduledate, setScheduledate] = useState({});
  console.log(scheduledate);

  console.log(Object.keys(scheduledate));

  const [userData, setUserData] = useState({
    labels: Object.keys(scheduledate),

    datasets: [
      {
        label: "time for the item_date",
        data: Object.values(scheduledate),
        backgroundColor: [
            "#f3ba2f"
            ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  useEffect(() => {
    setUserData({
        labels: Object.keys(scheduledate),
    
        datasets: [
          {
            label: "time for the item_date",
            data: Object.values(scheduledate),
            backgroundColor: [
            "#f3ba2f"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
        
        
      });
  }, [scheduledate])

  return (
    <div>
        <h4>Select a date to see at what time meal was scheduled by the customer
</h4>
      <div>
        
        {arr.map((date) => (
          <button
            onClick={() => {
              let dateData = props.data[date];
              delete dateData.value;
              console.log(dateData);
              setScheduledate(dateData)
              
            }}
            key={date}
          >
            {date}
          </button>
        ))}
      </div>
      <div>
        {console.log(userData)}
        {!(Object.keys(scheduledate).length === 0) && <BarChart chartData={userData} />}
      </div>
    </div>
  );
};

export default ShowDates;
