import c from "../data/langsiso3.json";

export default function LangWidget(props) {
  let { code, languages, setLanguages } = props;
  return (
    <div className="flex flex-row gap-4 text-wrap justify-between flex-wrap px-4 py-2 bg-slate-300 text-black text-lg">
      <span>{c[code].replace("; ", " / ")}</span>
      <span
        onClick={() => {
          let ind = languages.findIndex((l) => l == code);
          let ls = languages;
          if (ind > -1) {
            ls.splice(ind, 1);
            setLanguages([...ls]);
          }
        }}
      >
        x
      </span>
    </div>
  );
}
