import { useEffect, useState } from "react";
import "./App.css";

const API = "/api";

function App() {
  const [screen, setScreen] = useState("start");
  const [mode, setMode] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [player1Answers, setPlayer1Answers] = useState([]);
  const [player2Answers, setPlayer2Answers] = useState([]);

  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  // Load questions from FastAPI
  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch(`${API}/questions`);

        if (!response.ok) {
          throw new Error("Could not load questions");
        }

        const data = await response.json();

        setQuestions(data.questions || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(
          "Could not connect to the game server. Make sure FastAPI is running."
        );
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  function selectMode(selectedMode) {
    setMode(selectedMode);
    setError("");
  }

  function startGame() {
    if (!mode) {
      setError("Please choose a game mode.");
      return;
    }

    if (!player1Name.trim()) {
      setError("Please enter your nickname 🍉");
      return;
    }

    if (mode === "couple" && !player2Name.trim()) {
      setError("Please enter the second player's nickname 🍉");
      return;
    }

    if (questions.length === 0) {
      setError("Questions are still loading. Please wait.");
      return;
    }

    setQuestionIndex(0);
    setCurrentPlayer(1);

    setPlayer1Answers([]);
    setPlayer2Answers([]);

    setResult(null);
    setError("");

    setScreen("game");
  }

  async function calculateResults(player1, player2 = []) {
    setBusy(true);
    setError("");

    try {
      const response = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player1,
          player2: mode === "couple" ? player2 : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      setResult(data);
      setScreen("result");
    } catch (err) {
      console.error(err);

      setError(
        "Could not calculate the result. Please check that FastAPI is running."
      );
    } finally {
      setBusy(false);
    }
  }

  async function chooseAnswer(answerIndex) {
    if (busy) {
      return;
    }

    const question = questions[questionIndex];

    if (!question) {
      return;
    }

    const answer = {
      question_id: question.id,
      answer_index: answerIndex,
      answer: question.choices[answerIndex],
      score: question.scores?.[answerIndex] || {},
    };

    // SINGLE PLAYER
    if (mode === "single") {
      const updatedAnswers = [...player1Answers, answer];

      setPlayer1Answers(updatedAnswers);

      if (questionIndex === questions.length - 1) {
        await calculateResults(updatedAnswers);
      } else {
        setQuestionIndex(questionIndex + 1);
      }

      return;
    }

    // TWO PLAYER - PLAYER 1
    if (currentPlayer === 1) {
      const updatedAnswers = [...player1Answers, answer];

      setPlayer1Answers(updatedAnswers);
      setCurrentPlayer(2);

      return;
    }

    // TWO PLAYER - PLAYER 2
    const updatedAnswers = [...player2Answers, answer];

    setPlayer2Answers(updatedAnswers);

    if (questionIndex === questions.length - 1) {
      await calculateResults(player1Answers, updatedAnswers);
    } else {
      setQuestionIndex(questionIndex + 1);
      setCurrentPlayer(1);
    }
  }

  function resetGame() {
    setScreen("start");
    setMode(null);

    setPlayer1Name("");
    setPlayer2Name("");

    setQuestionIndex(0);
    setCurrentPlayer(1);

    setPlayer1Answers([]);
    setPlayer2Answers([]);

    setResult(null);
    setError("");
  }

  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {
    return (
      <div className="app">
        <div className="loading-card">
          <div className="watermelon">🍉</div>

          <h1>Loading...</h1>

          <p>Preparing the watermelon...</p>
        </div>
      </div>
    );
  }

  // -------------------------
  // START SCREEN
  // -------------------------

  if (screen === "start") {
    return (
      <div className="app">
        <div className="start-card">
          <div className="watermelon">🍉</div>

          <h1 className="title">
            BITE THE
            <span>WATERMELON</span>
          </h1>

          <p className="subtitle">
            A fun little test of how you react to everyday situations.
          </p>

          {!mode ? (
            <>
              <h2 className="choose-title">Choose your mode</h2>

              <div className="mode-grid">
                <button
                  className="mode-card"
                  onClick={() => selectMode("single")}
                >
                  <div className="mode-icon">🧍</div>

                  <h2>Single Player</h2>

                  <p>
                    Play alone and discover your own watermelon personality.
                  </p>
                </button>

                <button
                  className="mode-card"
                  onClick={() => selectMode("couple")}
                >
                  <div className="mode-icon">👥</div>

                  <h2>Two Player</h2>

                  <p>
                    Play with another person and compare your results.
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="selected-mode">
                {mode === "single"
                  ? "🧍 Single Player"
                  : "👥 Two Player"}
              </div>

              <div className="input-area">
                <input
                  type="text"
                  placeholder="Your nickname"
                  value={player1Name}
                  maxLength={20}
                  onChange={(event) =>
                    setPlayer1Name(event.target.value)
                  }
                />

                {mode === "couple" && (
                  <input
                    type="text"
                    placeholder="Second player's nickname"
                    value={player2Name}
                    maxLength={20}
                    onChange={(event) =>
                      setPlayer2Name(event.target.value)
                    }
                  />
                )}
              </div>

              <button
                className="main-button"
                onClick={startGame}
              >
                🍉 START BITING
              </button>

              <button
                className="back-button"
                onClick={() => {
                  setMode(null);
                  setError("");
                }}
              >
                ← Change mode
              </button>
            </>
          )}

          {error && <div className="error">{error}</div>}

          <p className="tiny-text">
            Entertainment & self-reflection only. Not a psychological
            or relationship diagnosis.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------
  // GAME SCREEN
  // -------------------------

  if (screen === "game") {
    const question = questions[questionIndex];

    if (!question) {
      return null;
    }

    const progress =
      ((questionIndex + 1) / questions.length) * 100;

    const currentName =
      mode === "single"
        ? player1Name
        : currentPlayer === 1
        ? player1Name
        : player2Name;

    return (
      <div className="app">
        <div className="game-container">

          <div className="game-header">
            <div className="logo">
              🍉 BITE THE WATERMELON
            </div>

            <div className="round">
              QUESTION {questionIndex + 1} / {questions.length}
            </div>
          </div>

          <div className="progress-background">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="turn-card">
            <span>
              {mode === "single"
                ? "PLAYER"
                : "CURRENT BITER"}
            </span>

            <strong>{currentName}</strong>
          </div>

          <div className="question-card">
            <div className="question-number">
              🍉 QUESTION {question.id}
            </div>

            <h2>{question.scenario}</h2>

            <p>
              What would you do?
            </p>
          </div>

          <div className="choices">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                className="choice-button"
                disabled={busy}
                onClick={() => chooseAnswer(index)}
              >
                <span className="choice-number">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{choice}</span>
              </button>
            ))}
          </div>

          {mode === "couple" && (
            <div className="secret-text">
              🤫 {currentName}'s answer is secretly adding
              watermelon seeds...
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------
  // RESULT SCREEN
  // -------------------------

  if (screen === "result") {
    if (!result) {
      return (
        <div className="app">
          <div className="loading-card">
            <div className="watermelon">🍉</div>
            <h2>Cutting the watermelon...</h2>
          </div>
        </div>
      );
    }

    return (
      <div className="app">
        <div className="result-container">

          <div className="result-header">
            <div className="big-watermelon">
              🍉
            </div>

            <h1>
              WATERMELON
              <span>CUT!</span>
            </h1>

            <p>
              Okay... let's see what was hiding inside 👀
            </p>
          </div>

          <div
            className={
              mode === "couple"
                ? "players-results two"
                : "players-results"
            }
          >
            <ResultCard
              name={player1Name}
              data={result.player1}
            />

            {mode === "couple" && (
              <ResultCard
                name={player2Name}
                data={result.player2}
              />
            )}
          </div>

          {mode === "couple" && (
            <div className="comparison-card">
              <h2>🍉 WATERMELON COMPARISON</h2>

              {result.comparison?.map((text, index) => (
                <p key={index}>
                  {text}
                </p>
              ))}
            </div>
          )}

          <div className="fun-card">
            <h2>
              🔮 RANDOM WATERMELON PREDICTION
            </h2>

            <p>
              {mode === "single"
                ? `${player1Name} probably has at least one suspicious watermelon seed. 🍉`
                : `${player1Name} and ${player2Name} definitely have some suspicious seeds. 🍉`}
            </p>
          </div>

          <button
            className="main-button"
            onClick={resetGame}
          >
            🍉 BITE AGAIN
          </button>

          <p className="tiny-text">
            This game is for fun and self-reflection. It does not
            diagnose personality, relationships, or mental health.
          </p>

        </div>
      </div>
    );
  }

  return null;
}


// =====================================
// RESULT CARD
// =====================================

function ResultCard({ name, data }) {
  if (!data) {
    return null;
  }

  return (
    <div className="result-card">

      <h2>
        🍉 {name}
      </h2>

      <div className="personality">
        {data.personality || "Watermelon Mystery 🍉"}
      </div>

      <div className="score-grid">

        <Score
          name="Green"
          icon="🟢"
          value={data.green_score}
        />

        <Score
          name="Sweetness"
          icon="🍬"
          value={data.sweetness}
        />

        <Score
          name="Trust"
          icon="🤝"
          value={data.trust}
        />

        <Score
          name="Communication"
          icon="💬"
          value={data.communication}
        />

        <Score
          name="Empathy"
          icon="❤️"
          value={data.empathy}
        />

        <Score
          name="Maturity"
          icon="🧠"
          value={data.maturity}
        />

      </div>

      <div className="seed-box">

        <h3>🌱 SEEDS FOUND</h3>

        <strong>
          {data.seed_count ?? 0}
        </strong>

        <p>
          {data.biggest_seed ||
            "No suspicious seed found 🍉"}
        </p>

      </div>
    </div>
  );
}


// =====================================
// SCORE BAR
// =====================================

function Score({ name, icon, value }) {
  const score = Math.max(
    0,
    Math.min(100, Number(value) || 0)
  );

  return (
    <div className="score-item">

      <div className="score-title">

        <span>
          {icon} {name}
        </span>

        <strong>
          {Math.round(score)}%
        </strong>

      </div>

      <div className="score-background">

        <div
          className="score-fill"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}

export default App;