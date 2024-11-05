const form = document.querySelector("form");
const cart = document.querySelector("section");

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
        var dateTime = data.location.localtime.split(" ");
        var condition = data.current.condition.text;
        var icon = data.current.condition.icon;
        console.log(data);

        cart.innerHTML += `<h2>${cityName}</h2>
        <div class='current'>
        <img alt='icon' src='${icon}'></img>
        <p class='condition'>${condition} - ${temperature}</p>
        <p class='day'>${dayName(dateTime[0])}</p>
        </div>`;
      })
      .catch((err) => {
        console.error("ERROR! ", err);
      });
  }
  form.reset();
});
