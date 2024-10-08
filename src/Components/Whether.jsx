import React, { useRef } from 'react';
import { useEffect, useState } from "react";

function Whether() {
  const inputRef = useRef();
  const [whetherData, setWhetherData] = useState(false);

  const allIcons = {
    "01d": "https://img.icons8.com/?size=100&id=qA3w9Yp2vY7r&format=png&color=000000",
    "01n": "https://img.icons8.com/?size=100&id=qA3w9Yp2vY7r&format=png&color=000000",
    "02d": "https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000",
    "02n": "https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000",
    "03d": "https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000",
    "03n": "https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000",
    "04d": "https://img.icons8.com/?size=100&id=MVj2tmasj0Pp&format=png&color=000000",
    "04n": "https://img.icons8.com/?size=100&id=MVj2tmasj0Pp&format=png&color=000000",
    "09d": "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000",
    "09n": "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000",
    "10d": "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000",
    "10n": "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000",
    "13d": "https://img.icons8.com/?size=100&id=cyZConbteZk9&format=png&color=000000",
    "13n": "https://img.icons8.com/?size=100&id=cyZConbteZk9&format=png&color=000000"
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name.");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon]; // Updated to "weather" instead of "whether"
      setWhetherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (err) {
      setWhetherData(false);
      console.error("Error in fetching data.");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="place-self-center p-10 rounded-lg bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center">
      <div className="flex items-center gap-3">
        <input ref={inputRef} type="text" placeholder="Search" className="h-[50px] border-none outline-none rounded-[40px] pl-[25px] text-gray-500 bg-teal-50 text-lg" />
        <img src="https://img.icons8.com/?size=30&id=7695&format=png&color=000000" alt="" className="w-[50px] p-[15px] rounded-full bg-teal-50 cursor-pointer" onClick={() => search(inputRef.current.value)} />
      </div>
      {whetherData ? (
        <>
          <div className="flex flex-col items-center">
            <img src={whetherData.icon} alt="Weather Icon" className="w-[150px] my-[30px]" />
            <p className="text-white text-[80px] leading-none">{whetherData.temperature}°C</p>
            <p className="text-white text-[40px]">{whetherData.location}</p>
          </div>
          <div className="w-full mt-[40px] text-white flex justify-between">
            <div className="flex items-start gap-3 text-[22px]">
              <img src="https://img.icons8.com/?size=100&id=I7Uv9dQ4WLYh&format=png&color=000000" alt="Humidity Icon" className="w-[26px] mt-[10px]" />
              <div>
                <p>{whetherData.humidity} %</p>
                <span className="block text-[16px]">Humidity</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-[22px]">
              <img src="https://img.icons8.com/?size=100&id=RtDA8YDN9Mi9&format=png&color=000000" alt="Wind Speed Icon" className="w-[26px] mt-[10px]" />
              <div>
                <p>{whetherData.windSpeed} Km/h</p>
                <span className="block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Whether;
