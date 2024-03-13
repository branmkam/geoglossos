import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ModeToggle(props) {
  const { dark, setDark } = props;

  return (
    <button
      className={`fixed font-oxygen top-2 right-2 px-4 py-2 text-2xl md:text-4xl z-40 rounded-lg ${
        dark ? "text-slate-300" : "text-slate-800"
      }`}
      onClick={() => setDark((d) => !d)}
    >
      <FontAwesomeIcon icon={dark ? faSun : faMoon} />
    </button>
  );
}
