import { useState } from "react";
import c from "../data/langsiso3.json";

export default function Autocomplete(props) {
  const { languages, setLanguages } = props;

  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);

  let ids = Object.keys(c);

  return (
    <div className="w-full h-48 sm:h-64 md:h-80 flex flex-col justify-end gap-0">
      {!selected && (
        <div className="w-full z-50 overflow-y-auto text-[12px] md:text-base bg-white rounded-md max-h-48 sm:max-h-64 md:max-h-80">
          {ids
            .filter((id) =>
              c[id].trim().toLowerCase().includes(value.trim().toLowerCase())
            )
            .toSorted((a, b) => b - a)
            .map((id) => (
              <div
                onClick={() => {
                  if (!languages.includes(id)) {
                    setSelected(null);
                    setValue("");
                    setLanguages((g) => [...g, id]);
                  }
                }}
                key={"disp" + id}
                className={
                  "flex flex-row px-2 justify-between hover:cursor-pointer bg-white hover:bg-blue-600 " +
                  // (c.population[id] < minPop ? " text-red-600 " : " text-green-900 ") +
                  (languages.includes(id)
                    ? "text-slate-400 hover:text-slate-400 hover:bg-transparent hover:cursor-auto"
                    : " hover:text-white ")
                }
              >
                <span className="text-left">{c[id]}</span>
                <span className="text-right">{"(" + id + ")"}</span>
              </div>
            ))}
        </div>
      )}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
r        className="w-full p-1 border-2 border-black rounded-lg sm:text-lg md:text-xl"
        placeholder="Type name here..."
      />
    </div>
  );
}
