const form = document.querySelector("form");
const cart = document.querySelector("section");

const dayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const getCurrentDay = async (city) => {
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b9ad3ea277b643dc92892849240511&q=${city}&days=7&aqi=no&alerts=no`
  );
  var data = await res.json();
  console.log(data);
  return data;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = document.querySelector("input");
  const city = input.value;
  console.log(city);
  if (city) {
    var result = await getCurrentDay(city);
    console.log("the current day is: ", result);
    if (result.current) {
      var cityName = `${result.location.name}/${result.location.country}`;
      var temperature = `${result.current.temp_c}°C`;
      var dateTime = result.location.localtime.split(" ");
      var condition = result.current.condition.text;
      var icon = result.current.condition.icon;

      cart.innerHTML += `<h2>${cityName}</h2>
      <div class='current'>
      <img alt='icon' src='${icon}'></img>
      <p class='condition'>${condition} - ${temperature}</p>
      <p class='day'>${dayName(dateTime[0])} - ${dateTime[1]}</p>
      </div>`;
      result.forecast.forecastday.forEach((day) => {
        const weekDay = dayName(day.date);
        const icon = day.day.condition.icon;
        const maxTemp = `${Math.round(day.day.maxtemp_c)}°`;
        const minTemp = `${Math.round(day.day.mintemp_c)}°`;

        cart.innerHTML += `<div class='weekDay'>
        <h2>${weekDay}</h2>
        <img alt='weekDay' src='${icon}'>
        <p class='minMax'>
        <span class='min'>${minTemp}</span><span class='max'>${maxTemp}</span>
        </p>
        </div>`;
      });
    } else if (result.error) {
      cart.innerHTML += `<h1 class='error'>${result.error.message}</h1>`;
    }
  }
  form.reset();
});
