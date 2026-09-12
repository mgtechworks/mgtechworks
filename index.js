const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");

// Local development: load .env if present. On GitHub Actions the secrets
// are already in process.env, and there is no .env file — hence the guard.
try {
  if (fs.existsSync(path.join(__dirname, ".env"))) process.loadEnvFile();
} catch (_) {}

const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), "utf8"));
const TEMPLATE = path.join(__dirname, "main.mustache");
const OUTPUT = path.join(__dirname, "README.md");

const DATA = {
  ...CONFIG,
  windIsOn: false,
  refresh_date: new Date().toLocaleDateString(CONFIG.locale || "en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: CONFIG.timeZone || "Europe/Budapest",
  }),
};

async function setWeatherInformation() {
  const key = process.env.OPEN_WEATHER_MAP_KEY;
  if (!key) {
    console.warn("OPEN_WEATHER_MAP_KEY is not set — skipping the weather section.");
    return;
  }

  const url =
    "https://api.openweathermap.org/data/2.5/weather" +
    `?q=${encodeURIComponent(CONFIG.weatherCity || CONFIG.city)}&appid=${key}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OpenWeatherMap responded ${res.status} ${res.statusText}`);
    const r = await res.json();

    DATA.temperature = Math.round(r.main.temp);
    DATA.wind = Math.round(r.wind.speed * 3.6); // m/s -> km/h
    DATA.weather = r.weather[0].description;
    DATA.weatherIconUrl = `https://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png`;
    if (DATA.wind > 10) DATA.windIsOn = true;
  } catch (err) {
    // A weather outage must never break the README build.
    console.warn(`Could not fetch weather: ${err.message} — skipping the weather section.`);
  }
}

function generateReadMe() {
  const template = fs.readFileSync(TEMPLATE, "utf8");
  fs.writeFileSync(OUTPUT, Mustache.render(template, DATA));
  console.log(`README.md generated (${DATA.refresh_date}).`);
}

(async () => {
  await setWeatherInformation();
  generateReadMe();
})();
