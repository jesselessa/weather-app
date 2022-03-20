export default function CityCard({ weatherCity }) {
  return (
    <div>
      <h3>
        {weatherCity.name}, {weatherCity.sys.country}
      </h3>
      <img
        src={`http://openweathermap.org/img/wn/${weatherCity.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <div>
        <p>
          <span>Temperature :</span> {Math.round(weatherCity.main.temp)} °C{" "}
          <br />
          (Min : {Math.round(weatherCity.main.temp_min)} ° C , Max :{" "}
          {Math.round(weatherCity.main.temp_max)} °C)
        </p>
        <p>
          <span>Description :</span> {weatherCity.weather[0].main}
        </p>
      </div>
    </div>
  );
}
