import { useState, useEffect } from "react";
import "./index.css";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  useMap,
  Popup,
} from "react-leaflet";
import c from "./data/langsiso3.json";
import testData from "./data/testData.json";

import AnimatedNumber from "./components/AnimatedNumber";
import MapEvents from "./components/MapEvents";
import LangWidget from "./components/LangWidget";
import Autocomplete from "./components/Autocomplete";

import axios from "axios";

function App() {
  const [dark, setDark] = useState(true);

  const [points, setPoints] = useState(testData);
  const [name, setName] = useState("");

  //new data form
  const [cityData, setCityData] = useState({});
  const [step, setStep] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [filterLang, setFilterLang] = useState(null);

  const [lat, setLat] = useState(50);
  const [lng, setLng] = useState(0);
  const [lat2, setLat2] = useState(null);
  const [lng2, setLng2] = useState(null);

  //points derived values
  let counts = {};
  let arr = points.map((p) => p.langs).flat();
  for (const c of arr) {
    if (c in counts) {
      counts[c] += 1;
    } else {
      counts[c] = 1;
    }
  }

  const buttonclasses = dark
    ? "bg-slate-300 text-slate-800"
    : "bg-slate-800 text-slate-300";

  const RecenterAutomatically = () => {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) {
        map.panTo([lat, lng]);
      }
    }, [map]);
    return null;
  };

  useEffect(() => {
    //add to db
    const fetchPoints = async () => {
      try {
        const response = await axios.get("http://localhost:4002/points"); // Fetch points from our API
        console.log(response.data);
        //setPoints(response.data); // Update state with fetched points
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="flex text-center text-base md:text-lg flex-col items-center justify-center w-screen h-screen font-oxygen">
      <div
        className={`flex flex-col gap-2 font-oxygen z-40 fixed top-2 left-2 ${
          dark ? "text-slate-300" : "text-slate-800"
        }`}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Geoglossos</h1>
        {/* will be animated, flashing different scripts every second (e.g. Greek, Cyrillic, Arabic, etc.) using useInterval */}
        <p>
          <AnimatedNumber
            end={points.length + (cityData.langs ? 1 : 0)}
            duration={1.5}
          />{" "}
          geoglossers
        </p>
      </div>

      {
        <button
          className={`fixed font-oxygen top-2 right-2 px-4 py-2 text-base md:text-2xl z-40 rounded-lg ${buttonclasses}`}
          onClick={() => setDark((d) => !d)}
        >
          {dark ? "light " : "dark "} mode
        </button>
      }

      {step >= 3 && (
        <div className="border-black border-[1px] fixed bottom-2 z-40 left-2 p-2 w-56 h-48 sm:w-60 rounded-lg bg-[#ffffffcc]">
          <p className="font-bold text-xl">Filter</p>
          <div className="flex text-wrap flex-col h-36 overflow-y-auto">
            {Object.keys(counts)
              .sort((a, b) => counts[b] - counts[a])
              .map((k) => (
                <div
                  key={k + "filter"}
                  onClick={() =>
                    filterLang == k ? setFilterLang(null) : setFilterLang(k)
                  }
                  className={`px-1 flex cursor-pointer hover:text-red-600 flex-wrap flex-row justify-between ${
                    filterLang == k &&
                    "font-bold text-blue-700 bg-[#dddddd] sticky top-0 bottom-0"
                  }`}
                >
                  <p className=" text-wrap">{c[k].replace("; ", "/")}</p>
                  <p>({counts[k]})</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {step < 3 && (
        <div
          className={`animate-fadein z-40 flex flex-col items-center justify-between gap-2 md:gap-10 px-4 py-8 border-2 border-black ${
            dark ? "bg-[#ffffffbb]" : "bg-[#ddddeeaa]"
          } rounded-xl sm:w-1/2 w-5/6 max-h-3/4`}
        >
          {/* step 1 */}
          {step == 0 && (
            <>
              <div className="flex flex-col justify-center items-center gap-1 w-full">
                <p>What's your first name?</p>
                <input
                  className="w-5/6 sm:w-5/8 p-2 rounded-lg"
                  placeholder="Type here... (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <p>What city are you from? Click on the map.*</p>
              <MapContainer
                className="z-40 h-48 sm:h-56 md:h-64 w-full md:w-5/6 rounded-lg"
                center={[lat, lng]}
                zoom={4}
                zoomControl={false}
                onClick={(e) => console.log(e)}
              >
                <TileLayer
                  attribution="Tiles &copy; Esri"
                  url={`https://{s}.basemaps.cartocdn.com/${
                    dark ? "dark" : "light"
                  }_all/{z}/{x}/{y}.png`}
                />
                {lat2 && lng2 && (
                  <CircleMarker radius={5} center={[lat2, lng2]} />
                )}
                <MapEvents
                  setCityData={setCityData}
                  setLat={setLat2}
                  setLng={setLng2}
                />
              </MapContainer>
              {cityData && Object.keys(cityData).length > 0 ? (
                <p className="text-center text-wrap text-slate-800">
                  {cityData.city ||
                    cityData.town ||
                    cityData.village ||
                    cityData.county}
                  {(cityData.city ||
                    cityData.town ||
                    cityData.village ||
                    cityData.county) &&
                    ","}{" "}
                  {cityData.state || cityData.region}
                  {(cityData.state || cityData.region) && ","}{" "}
                  {cityData.country}
                </p>
              ) : (
                <p className="text-center text-wrap text-lg text-slate-800">
                  No place selected
                </p>
              )}
            </>
          )}

          {/* step 2 */}
          {step == 1 && (
            <>
              <p>
                You're from{" "}
                <span className="font-bold">
                  {cityData.city ||
                    cityData.town ||
                    cityData.village ||
                    cityData.county}
                  {(cityData.city ||
                    cityData.town ||
                    cityData.village ||
                    cityData.county) &&
                    ","}{" "}
                  {cityData.state || cityData.region}
                  {(cityData.state || cityData.region) && ","}{" "}
                  {cityData.country}.
                </span>
              </p>
              <p className="font-bold text-lg md:text-xl">
                What languages do you speak{name && ", " + name}?
              </p>
              <div className="flex flex-col gap-2 w-full sm:w-5/6">
                <Autocomplete
                  languages={languages}
                  setLanguages={setLanguages}
                />
                {languages.length > 0 && (
                  <div className="flex flex-row min-h-10 flex-wrap gap-2">
                    {languages.map((l) => (
                      <LangWidget
                        key={"widget" + l}
                        code={l}
                        languages={languages}
                        setLanguages={setLanguages}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {/* step 3 */}
          {step == 2 && (
            <>
              <p className="text-xl sm:text-2xl">
                Thanks for your submission,{" "}
                <b>
                  {name ? name : "Anonymous"} from {cityData.country}
                </b>
                ! See your dot on the map in <b className="text-red-600">red</b>
                .
              </p>
            </>
          )}

          {/* buttons */}
          <div className="flex flex-row items-center text-sm md:text-base justify-center gap-4">
            {step < 2 && (
              <button
                onClick={() =>
                  step > 0 ? setStep((s) => s - 1) : setStep(100)
                }
                className="hover:text-slate-800 hover:bg-red-300 text-slate-200 bg-red-600 h-12 px-6 rounded-lg"
              >
                {step == 0 ? "No Thanks" : "Back"}
              </button>
            )}
            {cityData && cityData.country && (
              <button
                onClick={() => {
                  if (step > 1) {
                    let cd = cityData;
                    //remove unwanted address properties
                    let prop = [
                      "city",
                      "town",
                      "village",
                      "county",
                      "region",
                      "country",
                      "country_code",
                      "state",
                      "ISO3166-2-lvl4",
                      "lat",
                      "lng",
                    ];
                    for (let k in cd) {
                      if (prop.indexOf(k) < 0) {
                        delete cd[k];
                      }
                    }
                    setCityData(function () {
                      return {
                        ...cd,
                        langs: languages,
                        name: name,
                        date: new Date(),
                      };
                    });
                  }

                  // //add to db
                  // axios
                  //   .post("/../../backend/")
                  //   .then((response) => {
                  //     // Handle success
                  //     console.log(response.data);
                  //   })
                  //   .catch((error) => {
                  //     // Handle error
                  //     console.error("Error fetching data:", error);
                  //   });
                  setStep((s) => s + 1);
                }}
                className="text-white bg-blue-600 hover:bg-blue-400 hover:text-slate-800 h-12 px-6 rounded-lg"
              >
                {["Next", "Submit", "See the World"][step]}
              </button>
            )}
          </div>
        </div>
      )}

      {/* main map container */}
      <MapContainer
        className="fixed top-0 left-0 z-0 w-screen h-screen m-0"
        center={[lat, lng]}
        zoom={4}
        zoomControl={false}
      >
        <TileLayer
          attribution="Tiles &copy; Esri"
          url={`https://{s}.basemaps.cartocdn.com/${
            dark ? "dark" : "light"
          }_all/{z}/{x}/{y}.png`}
        />
        {points.length > 0 &&
          points
            .filter((p) => (filterLang ? p.langs.includes(filterLang) : true))
            .map((p, i) => (
              <CircleMarker key={"pt" + i} center={[p.lat, p.lng]} radius={4}>
                <Popup>
                  {p.name && p.name}
                  {p.name && <br />}
                  <i>
                    {p.city || p.town || p.village || p.county}
                    {(p.city || p.town || p.village || p.county) && ","}{" "}
                    {p.state || p.region}
                    {(p.state || p.region) && ","} {p.country}
                  </i>
                  <br />
                  <b>
                    {p.langs.map((l) => c[l].replace("; ", "/")).join(", ")}
                  </b>
                  <br />
                  Submitted on {new Date(p.date).toLocaleDateString()}
                </Popup>
              </CircleMarker>
            ))}
        {cityData.langs &&
          (!filterLang || cityData.langs.includes(filterLang)) &&
          step > 2 && (
            <CircleMarker
              center={[cityData.lat, cityData.lng]}
              radius={4}
              color={"#ff0000"}
            >
              <Popup>
                {name && name}
                {name && <br />}
                <i>
                  {cityData.city ||
                    cityData.town ||
                    cityData.village ||
                    cityData.county}
                  {(cityData.city ||
                    cityData.town ||
                    cityData.village ||
                    cityData.county) &&
                    ","}{" "}
                  {cityData.state || cityData.region}
                  {(cityData.state || cityData.region) && ","}{" "}
                  {cityData.country}
                </i>
                <br />
                <b>
                  {cityData.langs
                    .map((l) => c[l].replace("; ", "/"))
                    .join(", ")}
                </b>
                <br />
                Submitted on {new Date(cityData.date).toLocaleDateString()}
              </Popup>
            </CircleMarker>
          )}
        <RecenterAutomatically lat={lat} lng={lng} />
      </MapContainer>
    </div>
  );
}

export default App;
