const apiKey = "b62c6a84e84e21300387d07893e01ff8";
const input = document.getElementById("input");
const btn2 = document.getElementById("btn2");
const backButton = document.querySelector(".btn"); // Back tugmasi
const weatherImage = document.querySelector(".div1__img");

const tempDisplay = document.createElement("div");
tempDisplay.classList.add("weather-info");
document.querySelector(".div1").appendChild(tempDisplay);

const timeDisplay = document.getElementById("localTime");
const dateDisplay = document.getElementById("localDate");

// 🕒 Sana va soatni chiqarish
function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    dateDisplay.textContent = `${day}.${month}.${year}`;
}
setInterval(updateTime, 1000);
updateTime();


backButton.addEventListener("click", () => {
    window.location.href = "index.html";
});

btn2.addEventListener("click", async () => {
    const city = input.value.trim();
    if (!city) {
        alert("Iltimos, shahar nomini kiriting!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("Shahar topilmadi, boshqa nom kiriting!");
            return;
        }

        const condition = data.weather[0].main.toLowerCase();
        let imageUrl = "";

        if (condition.includes("clear")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Quyoshli
        } else if (condition.includes("cloud")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/414/414927.png"; // Bulutli
        } else if (condition.includes("rain")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"; // Yomg‘ir
        } else if (condition.includes("snow")) {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/4834/4834557.png"; // Qor
        } else {
            imageUrl = "https://cdn-icons-png.flaticon.com/512/1779/1779807.png"; // Default
        }

        weatherImage.style.background = `url('${imageUrl}') no-repeat center/cover`;

        tempDisplay.innerHTML = `
            <div class="temperature">🌡 ${data.main.temp.toFixed(1)}°C</div>
            <div class="divv">
                <div class="temp-min">⬇ Min: ${data.main.temp_min.toFixed(1)}°C</div>
                <div class="temp-max">⬆ Max: ${data.main.temp_max.toFixed(1)}°C</div>
            </div>
        `;

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
});
