window.addEventListener("load", () => {
  let lon;
  let lat;
  let APIkey = `32e79a9810e2c04e2dfe9f2934518867`;
  let pressureValue = document.querySelector("#actual-pressure");
  let pressureBorder = document.querySelector(".pressure-indicator");
  let windValue = document.querySelector("#actual-wind");
  let cloudsValue = document.querySelector("#actual-clouds");
  let tempValue = document.querySelector("#actual-temp");
  let tempBorder = document.querySelector(".temp-indicator");
  let station = document.querySelector("#station-city");
  let lowestTemp = document.querySelector("#lowest-temp");
  let highestTemp = document.querySelector("#highest-temp");
  let airqVal = document.querySelector("#actual-airq");
  let pm10Val = document.querySelector("#pm10-actual");
  let pm25Val = document.querySelector("#pm25-actual");
  let so2Val = document.querySelector("#so2-actual");
  let airqBorder = document.querySelector(".airq-indicator");
  let pm25Norm = document.querySelector("#pm25-norm");
  let pm10Norm = document.querySelector("#pm10-norm");
  let so2Norm = document.querySelector("#so2-norm");
  let pm10Border = document.querySelector(".pm10-indicator");
  let pm25Border = document.querySelector(".pm25-indicator");
  let so2Border = document.querySelector(".so2-indicator");
  let windBorder = document.querySelector(".wind-indicator");
  let units = `µg/m³`;

  console.log(document.querySelector(".forecast__main--temperature"));

  const getBrowserLocale = () =>
    navigator.language ||
    navigator.browserLanguage ||
    (navigator.languages || ["en"])[0];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=PL`;
      const api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=PL`;
      const api3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=PL`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, pressure, wind_speed, clouds } = data.current;
          const { min, max } = data.daily[0].temp;

          windBorder.style.border = "4px solid #ffffff";
          tempValue.textContent = Math.floor(temp) + "°c";
          pressureValue.innerHTML = pressure;
          cloudsValue.innerHTML = `clouds ${clouds}%`;
          windValue.innerHTML = Math.floor(wind_speed);
          lowestTemp.innerHTML = Math.ceil(min) + "°c";
          highestTemp.innerHTML = Math.floor(max) + "°c";

          console.log(data.daily);

          if (pressure > 1013) {
            pressureBorder.style.border = "4px solid #00cc55";
          } else {
            pressureBorder.style.border = "4px solid #dcab38";
          }

          if (temp < 13) {
            tempBorder.style.border = "4px solid #0082ec";
          } else if (temp >= 13 && temp < 30) {
            tempBorder.style.border = "4px solid #dcab38";
          } else {
            tempBorder.style.border = "4px solid #bf0404";
          }

          const forr = document.querySelector("#forr");

          data.daily.forEach((daily) => {
            const { clouds, dt, rain } = daily;
            const { min, max } = daily.temp;

            console.log(daily);

            let day = new Date(dt * 1000).toLocaleDateString(
              getBrowserLocale()
            );
            console.log(day);

            const dailyEl = document.createElement("div");
            let cloudsDaily = document.createElement("div");
            let lowTempDaily = document.createElement("div");
            let highTempDaily = document.createElement("div");
            let dayTime = document.createElement("div");
            let rainDaily = document.createElement("div");

            rainDaily.classList.add("rain-daily");
            dayTime.classList.add("day-time");
            lowTempDaily.classList.add("low-temp-daily");
            highTempDaily.classList.add("high-temp-daily");
            cloudsDaily.classList.add("clouds-daily");
            dailyEl.classList.add("daily-weather");

            rain != null
              ? (rainDaily.style.display = "block")
              : (rainDaily.style.display = "none");

            if (max < 13) {
              dailyEl.style.border = "4px solid #0082ec";
            } else if (max >= 13 && max < 30) {
              dailyEl.style.border = "4px solid #dcab38";
            } else {
              dailyEl.style.border = "4px solid #bf0404";
            }

            dailyEl.appendChild(dayTime);
            dailyEl.appendChild(cloudsDaily);
            dailyEl.appendChild(lowTempDaily);
            dailyEl.appendChild(highTempDaily);
            dailyEl.appendChild(rainDaily);
            dayTime.innerHTML = new Date(dt * 1000).toLocaleDateString("pl-PL");
            cloudsDaily.innerHTML = `Clouds: ${clouds}%`;
            lowTempDaily.innerHTML = `L: ${Math.floor(min) + "°c"}`;
            highTempDaily.innerHTML = `H: ${Math.floor(max) + "°c"}`;
            rainDaily.innerHTML = `Rain: ${Math.floor(rain) + "mm"}`;

            forr.appendChild(dailyEl);
          });
        });

      fetch(api2)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          const { name } = res;
          station.innerHTML = name;
        });

      fetch(api3)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          const { pm10, pm2_5, so2 } = res.list[0].components;
          const { aqi } = res.list[0].main;

          airqVal.innerHTML = aqi;
          pm10Val.innerHTML = `${pm10}${units}`;
          pm25Val.innerHTML = `${pm2_5}${units}`;
          so2Val.innerHTML = `${so2}${units}`;
          pm25Norm.innerHTML = Math.floor((pm2_5 / 25) * 100) + "%";
          pm10Norm.innerHTML = Math.floor((pm10 / 50) * 100) + "%";
          so2Norm.innerHTML = Math.floor((so2 / 125) * 100) + "%";

          if (aqi == 1) {
            airqBorder.style.border = "4px solid #00cc55"; // best
          } else if (aqi > 1 && aqi <= 2) {
            airqBorder.style.border = "4px solid #EEEE77";
          } else if (aqi > 2 && aqi <= 3) {
            airqBorder.style.border = "4px solid #af6e0c"; // worse
          } else if (aqi > 3 && aqi <= 4) {
            airqBorder.style.border = "4px solid #df0000"; // worst
          } else if (aqi > 4 && aqi <= 5) {
            airqBorder.style.border = "4px solid #5a123f";
          }

          if (Math.floor((pm10 / 50) * 100) <= 30) {
            pm10Border.style.border = "2px solid #00cc55";
          } else if (
            Math.floor((pm10 / 50) * 100) > 30 &&
            Math.floor((pm10 / 50) * 100) <= 75
          ) {
            pm10Border.style.border = "2px solid #af6e0c";
          } else {
            pm10Border.style.border = "2px solid #df0000";
          }

          if (Math.floor((pm2_5 / 25) * 100) <= 30) {
            pm25Border.style.border = "2px solid #00cc55";
          } else if (
            Math.floor((pm2_5 / 25) * 100) > 30 &&
            Math.floor((pm2_5 / 25) * 100) <= 75
          ) {
            pm25Border.style.border = "2px solid #af6e0c";
          } else {
            pm25Border.style.border = "2px solid #df0000";
          }

          if (Math.floor((so2 / 125) * 100) <= 30) {
            so2Border.style.border = "2px solid #00cc55";
          } else if (
            Math.floor((so2 / 125) * 100) > 30 &&
            Math.floor((so2 / 125) * 100) <= 75
          ) {
            so2Border.style.border = "2px solid #af6e0c";
          } else {
            so2Border.style.border = "2px solid #df0000";
          }
        });
    });
  }
});
