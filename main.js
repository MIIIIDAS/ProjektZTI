const fullname = document.querySelector('#fullname');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const participants = document.querySelector('#participants');
const resetButton = document.querySelector('.reset');
const sendButton = document.querySelector('.send');

function showOrHideErrorMessage(input, message) {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = message;
}

function checkInputLength(input, minLength) {
    if (input.value.length < minLength) {
        showOrHideErrorMessage(input, `Pole ${input.previousElementSibling.innerHTML.toLowerCase().replace(':', '')} powinno zawierać minimum ${minLength} znaków`);
    } else {
        showOrHideErrorMessage(input, '');
    }
}

function checkEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email.value)) {
        showOrHideErrorMessage(email, 'Adres email nieprawidłowy');
    } else {
        showOrHideErrorMessage(email, '');
    }
}

function checkPhone(phone) {
    const regex = /^[0-9]{9,15}$/;

    if (!regex.test(phone.value)) {
        showOrHideErrorMessage(phone, 'Numer telefonu nieprawidłowy');
    } else {
        showOrHideErrorMessage(phone, '');
    }
}

function checkDate(date) {
    const today = new Date().toISOString().split('T')[0];
    if (date.value < today) {
        showOrHideErrorMessage(date, 'Data nie może być wcześniejsza niż dzisiejsza');
    } else {
        showOrHideErrorMessage(date, '');
    }
}

function checkParticipants(participants) {
    if (participants.value < 1) {
        showOrHideErrorMessage(participants, 'Liczba osób musi być co najmniej 1');
    } else {
        showOrHideErrorMessage(participants, '');
    }
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkInputLength(fullname, 5);
    checkEmail(email);
    checkPhone(phone);
    checkDate(date);
    checkParticipants(participants);

    const errorMessages = document.querySelectorAll('.error');
    const noErrors = Array.from(errorMessages).every(errorMessage => errorMessage.textContent === '');
    if (noErrors) {
        alert('Formularz został wysłany');
    }
});

resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    fullname.value = '';
    email.value = '';
    phone.value = '';
    date.value = '';
    time.value = '';
    participants.value = '';

    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(errorMessage => {
        errorMessage.textContent = '';
    });
});

const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');
const cityName = document.querySelector('h2.city');
const img = document.querySelector('img');
const temperature = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const wind_speed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=0f34a2dbe5618f738436c92d68109252';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather() {
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;

    axios.get(URL)
        .then((response) => {
            console.log(response);
            cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
            img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
            temperature.textContent = `${Math.round(response.data.main.temp)}°C`;
            description.textContent = `${response.data.weather[0].description}`;
            feelsLike.textContent = `${Math.round(response.data.main.feels_like)} °C`;
            pressure.textContent = `${response.data.main.pressure} hPa`;
            humidity.textContent = `${response.data.main.humidity} %`;
            wind_speed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
            clouds.textContent = `${response.data.clouds.all} %`;
            visibility.textContent = `${response.data.visibility / 1000} km`;
            errorMessage.textContent = '';
        })
        .catch((error) => {
            console.log(error.response);
            errorMessage.textContent = `${error.response.data.message}`;
            img.src = '';
            [visibility, clouds, wind_speed, pressure, humidity, temperature, feelsLike, cityName, description].forEach((element) => {
                element.textContent = '';
            });
        })
        .finally(() => {
            input.value = '';
        });
}

button.addEventListener('click', getWeather);
