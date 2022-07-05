import { useEffect, useState } from "react";
import "./App.css";

const words = [
  "ALBUM",
  "HINGE",
  "MONEY",
  "SCRAP",
  "GAMER",
  "GLASS",
  "SCOUR",
  "BEING",
  "DELVE",
  "YIELD",
  "METAL",
  "TIPSY",
  "SLUNG",
  "FARCE",
  "GECKO",
  "SHINE",
  "CANNY",
  "MIDST",
  "BADGE",
  "HOMER",
  "TRAIN",
  "STORY",
  "HAIRY",
  "FORGO",
  "LARVA",
  "TRASH",
  "ZESTY",
  "SHOWN",
  "HEIST",
  "ASKEW",
  "INERT",
  "OLIVE",
  "PLANT",
  "OXIDE",
  "CARGO",
  "FOYER",
  "FLAIR",
  "AMPLE",
  "CHEEK",
  "SHAME",
  "MINCE",
  "CHUNK",
  "ROYAL",
  "SQUAD",
  "BLACK",
  "STAIR",
  "SCARE",
  "FORAY",
  "COMMA",
  "NATAL",
  "SHAWL",
  "FEWER",
  "TROPE",
  "SNOUT",
  "LOWLY",
  "STOVE",
  "SHALL",
  "FOUND",
  "NYMPH",
];

function App() {
  const [solution, setSolution] = useState("");
  const [won, setWon] = useState(false);
  const [myWord, setMyWord] = useState("");
  const [attempt, setAttempt] = useState(0);
  // eslint-disable-next-line no-array-constructor
  const [trials, setTrials] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => "")),
  );

  useEffect(() => {
    setSolution(words[Math.floor(Math.random() * words.length)].toLowerCase());
  }, []);

  const onInputChange = (e) => {
    if (won) {
      return;
    }
    setMyWord(e.target.value);
  };

  const onCheck = (e) => {
    e.preventDefault();
    if (won || myWord.length !== 5 || attempt >= 6) {
      return;
    }
    if (myWord === solution) {
      setWon(true);
    }

    const newState = trials;
    newState[attempt] = myWord.split("");
    setTrials(newState);
    setAttempt(attempt + 1);
  };

  const checkLetter = (letter, index) => {
    if (solution.split("")[index] === letter) {
      return "green";
    }

    if (solution.split("").includes(letter)) {
      return "orange";
    }

    return "";
  };

  return (
    <div className="wordle">
      <div className="board">
        {trials.map((el) => (
          <div key={`${el}-${Math.random() * 1000}`} className="row">
            {el.map((letter, i) => (
              <div
                key={`${letter}-${Math.random() * 1000}`}
                className={`letter ${checkLetter(letter, i)}`}
              >
                <span>{letter}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="input-section">
        <form>
          <input
            value={myWord}
            onChange={onInputChange}
            maxLength={5}
            type="text"
            placeholder="type your 5 letter word"
          />
          <button onClick={onCheck} type="submit">
            Check
          </button>
        </form>
      </div>
      {attempt === 6 && (
        <div className="solution">
          <h4>Solution</h4>
          <p>
            <strong>
              <em>{solution}</em>
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
