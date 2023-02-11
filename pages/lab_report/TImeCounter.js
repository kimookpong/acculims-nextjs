import React, { useEffect, useState } from "react";

const TimeCounter = (props) => {
  const { recieveDate } = props;
  const [time, setTime] = useState({
    days: 0,
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const startTime = new Date(recieveDate);

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const days = Math.floor(elapsedTime / 1000 / 60 / 60 / 24);
      const hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;
      const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
      const seconds = Math.floor(elapsedTime / 1000) % 60;
      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [recieveDate]);

  return (
    <div style={{ color: "red" }}>
      {time.days ? time.days + "." : ""}
      {time.hours.toString().padStart(2, "0")}:
      {time.minutes.toString().padStart(2, "0")}:
      {time.seconds.toString().padStart(2, "0")}
    </div>
  );
};
export default TimeCounter;
