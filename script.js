const form = document.querySelector("form");
const today = document.getElementsByClassName("today")[0];

const dayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("input");
  const city = input.value;
  console.log(city);
  if (city) {
    fetch(
      `
http://api.weatherapi.com/v1/forecast.json?key=b9ad3ea277b643dc92892849240511&q=casablanca&days=7&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((data) => {
        var cityName = `${data.location.name}/${data.location.country}`;
        var temperature = `${data.current.temp_c}°C`;
        var time = data.location.localtime.split(" ");
        var condition = data.current.condition.text;
        var icon = data.current.condition.icon;
        console.log(data);
        console.log(time);

        today.innerHTML += `<img alt='icon' src='${icon}'></img>
        <h2>${cityName}</h2>
        <p>${condition} - ${temperature}</p>
        <p>${dayName(time[0])}</p>`;
      })
      .catch((err) => {
        console.error("ERROR! ", err);
      });
  }
  form.reset();
});
