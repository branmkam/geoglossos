import { useMapEvents } from "react-leaflet";
import { useState } from "react";

export default function MapEvents(props) {
  const { setCityData, setLat, setLng } = props;
  const [data, setData] = useState("");

  const map = useMapEvents({
    click: (e) => {
      map.locate();
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);

      fetch(
        `https://geocode.maps.co/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&api_key=65f0919967b30414348321tava10d3f`
      )
        .then((res) => res.json())
        .then((data) => {
          setCityData({ ...data.address, lat: data.lat, lng: data.lon });
        });
    },
  });
  return null;
}
