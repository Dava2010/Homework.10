function updateLocalTime() {
    const timeElement = document.getElementById("localTime");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateLocalDate() {
    const dateElement = document.getElementById("localDate");
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

function updateBatteryStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const batteryElement = document.getElementById("batteryStatus");
            if (batteryElement) {
                const level = Math.round(battery.level * 100);
                batteryElement.textContent = `Battery: ${level}%`;
            }
        }).catch(error => {
            console.error("Batareya ma'lumotlarini olishda xatolik:", error);
        });
    } else {
        console.warn("Brauzer batareya ma'lumotlarini qo‘llab-quvvatlamaydi.");
    }
}

setInterval(updateLocalTime, 1000);
updateLocalTime();
updateLocalDate();
updateBatteryStatus();

const apiKey = "b62c6a84e84e21300387d07893e01ff8";
const city = "Tashkent";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

async function setWeatherEffect() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            console.error("Xatolik:", data.message);
            return;
        }

        const condition = data.weather[0].description.toLowerCase();
        const div1 = document.querySelector(".div1");
        const weatherImgDiv = document.querySelector(".div1__img");
        let imageUrl = "";
        let effectClass = "";

        if (condition.includes("ясно") || condition.includes("sunny")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            effectClass = "sunny";
        } else if (condition.includes("облачно") || condition.includes("cloud")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
            effectClass = "cloudy";
        } else if (condition.includes("дождь") || condition.includes("rain")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
            effectClass = "rainy";
        } else if (condition.includes("снег") || condition.includes("snow")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/4834/4834557.png";
            effectClass = "snowy";
        } else {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/1779/1779807.png";
            effectClass = "default";
        }

        if (weatherImgDiv) {
            weatherImgDiv.style.backgroundImage = `url('${imageUrl}')`;
            weatherImgDiv.style.backgroundRepeat = "no-repeat";
            weatherImgDiv.style.backgroundSize = "contain";
            weatherImgDiv.style.backgroundPosition = "center";
        } else {
            console.error("div1__img elementi topilmadi!");
        }

        div1.classList.remove("sunny", "cloudy", "rainy", "snowy", "default");
        div1.classList.add(effectClass);
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn");

    btn.addEventListener("click", function () {
        window.location.href = "index2.html";
    });
});

document.addEventListener("DOMContentLoaded", setWeatherEffect);