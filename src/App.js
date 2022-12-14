import React, { useState } from "react";
import PairCard from "./components/PairCard";
import "./App.css";

function App() {
  const [scoreBoard, setScoreBoard] = useState([]);
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [scoreHome, setScoreHome] = useState(0);
  const [scoreAway, setScoreAway] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!home || !away) {
      alert("Away and home Fields must not be empty");
      return;
    }
    const newPair = {
      id: Math.random(),
      home,
      away,
      date: new Date().now,
      scoreHome,
      scoreAway,
      inProgress: true,
    };
    setScoreBoard([...scoreBoard, newPair]);
    setHome("");
    setAway("");
  };

  const finishTheGame = (doneId) => {
    setScoreBoard(
      scoreBoard.map((p) => {
        if (p.id === +doneId) {
          return { ...p, inProgress: false };
        }
        return p;
      })
    );
  };
  return (
    <div style={{ width: "30rem", margin: "0 auto" }}>
      <form className="form-group " onSubmit={handleSubmit}>
        <h3>Score</h3>
        <div>
          <label htmlFor="start">Home team:</label>
          <input
            type="text"
            className="form-control mb-2 grocery"
            placeholder="Home team"
            value={home}
            onChange={(e) => setHome(e.target.value)}
          />

          <label htmlFor="start">Away team:</label>
          <input
            type="text"
            className="form-control mb-2 grocery"
            placeholder="Away Team"
            value={away}
            onChange={(e) => setAway(e.target.value)}
          />

          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>
      </form>

      <h1>Live (in Progress)</h1>
      {scoreBoard.length > 0 &&
        scoreBoard.map(
          (pair) =>
            pair.inProgress && (
              <PairCard
                inProgress={pair.inProgress}
                setScoreBoard={setScoreBoard}
                scoreBoard={scoreBoard}
                key={pair.id}
                finishTheGame={finishTheGame}
                pair={pair}
                isEditing={isEditing}
              />
            )
        )}
      <h1>Finished games</h1>
      {scoreBoard.length > 0 &&
        scoreBoard
          .map(
            (pair) =>
              !pair.inProgress && (
                <PairCard
                  key={pair.id}
                  setScoreBoard={setScoreBoard}
                  scoreBoard={scoreBoard}
                  finishTheGame={finishTheGame}
                  pair={pair}
                  isEditing={isEditing}
                />
              )
          )
          .sort((a, b) => b.date - a.date)}
    </div>
  );
}

export default App;
