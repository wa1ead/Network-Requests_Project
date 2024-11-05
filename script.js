const form = document.querySelector("form");
const today = document.getElementsByClassName("today");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("input");
  const city = input.value;
  console.log(city);
  if (city) {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=b9ad3ea277b643dc92892849240511&q=${city}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        var cityName = `${data.location.name}/${data.location.country}`;
        
      })
      .catch((err) => {
        console.error("ERROR! ", err);
      });
  }
  form.reset();
});
