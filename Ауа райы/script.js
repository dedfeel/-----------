const apiKey = 'e3ad77404dc88bee59f4a50942c3dbc6'
let headBtn = document.getElementById('headBtn')
let data = new Date()
let today = data.getDate()
let month = data.getMonth() + 1
let year = data.getFullYear()
let place = document.getElementById('place')
let barlyqQala = document.getElementById('barlyqQala')
let TandalqanQala = document.getElementById('TandalqanQala')
let qala = ['Almaty', 'Astana', 'Bishkek']

headBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let city = document.getElementById('inputPoisk').value.trim()
    if (city) {
        fetchData(city);
        document.getElementById('inputPoisk').value = "";
    }
});

barlyqQala.addEventListener('click', function () {
    document.getElementById('card').innerHTML = ""
    qala.forEach(city => {
        fetchData(city);
    });
});

async function fetchData(city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Қаланы табу мүмкін емес!");
        }
        let weatherData = await response.json();
        displayWeather(weatherData);
    } catch (err) {
        console.error(err);
    }
}

function displayWeather(data) {
    let cardContainer = document.getElementById('card')
    let weatherCard = document.createElement('div')

    weatherCard.classList.add('weather-card')
    weatherCard.style.backgroundColor = '#F5F5F5'
    weatherCard.style.padding = '50px'
    weatherCard.style.margin = '10px'
    weatherCard.style.borderRadius = '15px'
    weatherCard.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    weatherCard.innerHTML = `
        <div class='card-content'>
            <p class='card1 Date'>${today}.${month}.${year}</p>
            <h2 class='card1'>${data.name}, ${data.sys.country}</h2>
            <h1 class='card1'>${data.main.temp}°C</h1>
            <p class='card1'>Жел бағыты: ${data.wind.deg}°</p>
            <p class='card1'>Ылғалдылық: ${data.main.humidity}%</p>
            <p class='card1'>Қысым: ${data.main.pressure} hPa</p>
        </div>
    `;
    cardContainer.appendChild(weatherCard)
    document.querySelector('.section').style.minHeight = '100vh'
}
