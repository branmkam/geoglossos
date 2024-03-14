import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ModeToggle(props) {
  const { dark, setDark, setHelp } = props;

  return (
    <div className="fixed z-40 flex flex-row gap-2 text-2xl font-oxygen top-2 right-2 md:text-4xl">
      <button
        onClick={() => setHelp((h) => !h)}
        className={`${
          dark ? "text-slate-300" : "text-slate-800"
        } hover:text-red-600`}
      >
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <button
        className={`${
          dark ? "text-slate-300" : "text-slate-800"
        } hover:text-red-600`}
        onClick={() => setDark((d) => !d)}
      >
        <FontAwesomeIcon icon={dark ? faSun : faMoon} />
      </button>
    </div>
  );
}
