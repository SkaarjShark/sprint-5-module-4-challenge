async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
  const currentDay = new Date().getDay()

  let days = [
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"]
  ]

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  // Task 1
  const weatherWidget = document.querySelector("#weatherWidget")
  weatherWidget.style="display: none;"
  // Task 2
  const dropDown = document.querySelector("#citySelect")
  dropDown.addEventListener("change", async (evt) => {
    try {
      dropDown.setAttribute('disabled', 'disabled')
      weatherWidget.style.display = "none"
      document.querySelector('.info').textContent = 'Fetching weather data...'

      console.log(evt.target.value)
      let url = `http://localhost:3003/api/weather?city=${evt.target.value}`
      //console.log(url)

      // const res = await axios.get(url)
      // console.log(res.data)
      await axios.get(url)
        .then(res => {
          document.querySelector('.info').textContent = ''
          weatherWidget.style.display = "block"
          evt.target.removeAttribute('disabled')
          // Start
          console.log(res.data)
          // All Current Numbers
          document.querySelector("#location").firstElementChild.textContent = evt.target.value
          document.querySelector('#apparentTemp').lastElementChild.textContent = `${res.data.current.apparent_temperature}°`
          document.querySelector('#todayStats').firstElementChild.textContent = `${res.data.current.temperature_min}°/${res.data.current.temperature_max}°`
          document.querySelector('#todayStats div:nth-child(2)').textContent = `Precipitation: ${res.data.current.precipitation_probability*100}%`
          document.querySelector('#todayStats div:nth-child(3)').textContent = `Humidity: ${res.data.current.humidity}%`
          document.querySelector('#todayStats').lastElementChild.textContent = `Wind: ${res.data.current.wind_speed}m/s`
          //Icons
          const weatherDesc = res.data.current.weather_description
          let weatherChange = document.querySelector('#todayDescription')
          for (let i = 0; i < descriptions.length; i++) {
            if (weatherDesc === descriptions[i][0]) {
              weatherChange.textContent = descriptions[i][1]
            }
          }
          // Looping through Monday - Wednesday
          for (let i = 1; i < 4; i++) {
            document.querySelector(`#forecast div:nth-child(${i}) div:nth-child(3)`).textContent = `${res.data.forecast.daily[i-1].temperature_min}°/${res.data.forecast.daily[i-1].temperature_max}°`
            document.querySelector(`#forecast div:nth-child(${i}) div:nth-child(4)`).textContent = `Precipitation: ${res.data.forecast.daily[i-1].precipitation_probability*100}%`
            //Icons
            const weatherDescFore = res.data.forecast.daily[i-1].weather_description
            let weatherChangeFore = document.querySelector(`#forecast div:nth-child(${i}) div:nth-child(2)`)
            for (let j = 0; j < descriptions.length; j++) {
              if (weatherDescFore === descriptions[j][0]) {
                weatherChangeFore.textContent = descriptions[j][1]
              }
            }
            //Days
            const dayFore = currentDay+i
            let daySet = document.querySelector(`#forecast div:nth-child(${i}) div:nth-child(1)`)
            for (let k = 0; k < days.length; k++) {
              if (dayFore === days[k][0]) {
                daySet.textContent = days[k][1]
              }
            }
          }
        })
    }
    catch(err) {
      console.log(err.message)
      document.querySelector('.info').textContent = 'Something went wrong...'
    }
  })

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
