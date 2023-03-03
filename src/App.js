import data from "./data.json";
import { useEffect, useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import ShowDates from "./components/ShowDates";

for (let i = 0; i < data.length; i++) {
  data[i]["item_date"] = new Date(data[i]["item_date"]).toISOString();
  let ISToffSet = 330;
  let offset = ISToffSet * 60 * 1000;
  data[i]["schedule_time"] = new Date(
    new Date(data[i]["schedule_time"]) - ISToffSet
  );
}

function App() {
  function dayofbooking(reservationdate) {
    reservationdate = new Date(reservationdate).toISOString();
    let dateschedule = {};
    let j = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["item_date"] === reservationdate) {
        let k = data[i]["schedule_time"];
        let str = `${k.getFullYear()}-${k.getMonth() + 1}-${k.getDate()}`;
        if (!dateschedule[str]) {
          dateschedule[str] = {};
        }
        dateschedule[str]["value"] = dateschedule[str]["value"] + 1 || 1;
        let h = k.getHours();
        if (h < 3) {
          dateschedule[str]["12 AM - 3 AM"] =
            dateschedule[str]["12 AM - 3 AM"] + 1 || 1;
        } else if (h < 6) {
          dateschedule[str]["3 AM - 6 AM"] =
            dateschedule[str]["3 AM - 6 AM"] + 1 || 1;
        } else if (h < 9) {
          dateschedule[str]["6 AM - 9 AM"] =
            dateschedule[str]["6 AM - 9 AM"] + 1 || 1;
        } else if (h < 12) {
          dateschedule[str]["9 AM - 12 PM"] =
            dateschedule[str]["9 AM - 12 PM"] + 1 || 1;
        } else if (h < 15) {
          dateschedule[str]["12 PM - 3 PM"] =
            dateschedule[str]["12 PM - 3 PM"] + 1 || 1;
        } else if (h < 18) {
          dateschedule[str]["3 PM - 6 PM"] =
            dateschedule[str]["3 PM - 6 PM"] + 1 || 1;
        } else if (h < 21) {
          dateschedule[str]["6 PM - 9 PM"] =
            dateschedule[str]["6 PM - 9 PM"] + 1 || 1;
        } else {
          dateschedule[str]["9 PM - 12 AM"] =
            dateschedule[str]["9 PM - 12 AM"] + 1 || 1;
        }
      }
    }

    return dateschedule;
  }

  const [date, setDate] = useState("2021-05-23");
  const [flag, setflag] = useState(true);

  const [UsersData, setUsersData] = useState(dayofbooking(date));

  useEffect(() => {
    setUsersData(dayofbooking(date));
    
  }, [date]);

  function getarrayofvalues() {
    const arr = [];
    for (const key in UsersData) {
      for (const innerKey in UsersData[key]) {
        if (innerKey === "value") {
          arr.push(UsersData[key][innerKey]);
        }
      }
    }
    return arr;
  }

  const [userData, setUserData] = useState({
    labels: Object.keys(UsersData),

    datasets: [
      {
        label: "Scheduling Date",
        data: getarrayofvalues(),
        backgroundColor: [
          
          "#50AF95"
          
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setUserData({
      labels: Object.keys(UsersData),

      datasets: [
        {
          label: "Scheduling Date",
          data: getarrayofvalues(),
          backgroundColor: [
            "#50AF95"
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [UsersData]);

  return (
    <div className="App">
      <h4>
        
        Select a date from 2021-05-19 to 2022-01-05 <br /> For details of
        reservation schedule
      </h4>
      <input
        onChange={(e) => {
          setflag(!flag)
          setDate(e.target.value)
        
        }}
        type="date"
        id="start"
        name="trip-start"
        value={date}
        min="2021-05-19"
        max="2022-01-05"
      ></input>
      <div id="flexx">
        <div style={{ width: 700 }}>
          {console.log(userData)}
          <BarChart chartData={userData} />
        </div>
        <div style={{ width: 500 }}>
         {flag  && <ShowDates data={UsersData} />}
         {!flag &&<ShowDates data={UsersData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
