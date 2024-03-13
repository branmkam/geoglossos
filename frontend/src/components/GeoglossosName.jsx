import useInterval from "../utils/useInterval";
import { useState } from "react";

export default function GeoglossosName() {
  const names = [
    "Geoglossos",
    "γεωγλωσσος",
    "Геоглоссос",
    "جيولوجيسوس",
    "ジオグロッソス",
    "גיאוגלוסוס",
    "지오글로소스",
    "जियोग्लोसोस",
  ];

  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  useInterval(function () {
    setIndex((i) => (i + 1) % names.length);
  }, 4000);

  return (
    <div className={`flex flex-col items-start sm:flex-row sm:items-end ${hover && 'cursor-pointer'}`}>
      <h1
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="p-1 text-2xl font-bold md:text-4xl"
      >
        {hover ? names[0] : names[index]}
      </h1>
      {/* {index > 0 && <p>(Geoglossos)</p>} */}
    </div>
  );
}
