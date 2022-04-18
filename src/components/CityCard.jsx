// props is an objet which contains a key called weatherCity, and that we can destructure

export default function CityCard({ weatherCity, onClick }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-5 mx-auto">
      <h3 className="font-bold text-xl mb-2 text-center">
        {weatherCity.name}, {weatherCity.sys.country}
      </h3>
      <img
        className="w-24 mx-auto"
        src={`http://openweathermap.org/img/wn/${weatherCity.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <div className="px-6 py-4 text-center">
        <p>
          <span className="text-gray-700 font-bold text-base">
            Temperature :
          </span>{" "}
          {Math.round(weatherCity.main.temp)} °C <br />
          (Min : {Math.round(weatherCity.main.temp_min)} ° C , Max :{" "}
          {Math.round(weatherCity.main.temp_max)} °C)
        </p>
        <p>
          <span className="text-gray-700 font-bold text-base">
            Description :
          </span>{" "}
          {weatherCity.weather[0].main}
        </p>
      </div>
      {onClick && (
        <div className="flex justify-center ">
          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Remove favorite
          </button>
        </div>
      )}
    </div>
  );
}
