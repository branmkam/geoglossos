import c from "../data/langsiso3.json";

export default function LangWidget(props) {
  let { code, languages, setLanguages } = props;
  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-4 px-2 py-1 text-sm text-black sm:py-2 sm:px-4 text-wrap bg-slate-300 md:text-lg">
      <span>{c[code].replace("; ", " / ")}</span>
      <span
        className="cursor-pointer"
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
