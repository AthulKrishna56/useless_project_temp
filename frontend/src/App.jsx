import { useEffect, useState } from "react";
import "./index.css";

const API = "/api";

function App() {
  const [screen, setScreen] = useState("start");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [player1Answers, setPlayer1Answers] = useState([]);
  const [player2Answers, setPlayer2Answers] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD QUESTIONS
  // ==========================================

  useEffect(() => {
    fetch(`${API}/api/questions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load questions");
        }

        return response.json();
      })
      .then((data) => {
        setQuestions(data.questions || []);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to the game server.");
      });
  }, []);

  // ==========================================
  // START GAME
  // ==========================================

  function startGame() {
    if (!player1.trim() || !player2.trim()) {
      alert("Rand perum nickname enter cheyyu 🍉");
      return;
    }

    if (questions.length === 0) {
      alert("Questions loading aanu. Kurachu seconds kazhinju try cheyyu.");
      return;
    }

    setCurrentQuestion(0);
    setCurrentPlayer(1);

    setPlayer1Answers([]);
    setPlayer2Answers([]);

    setResult(null);
    setError("");

    setScreen("game");
  }

  // ==========================================
  // SUBMIT FINAL ANSWER
  // ==========================================

  async function submitFinalAnswer(index) {
    const question = questions[currentQuestion];

    if (!question) {
      return;
    }

    const answerData = {
      question_id: question.id,
      answer_index: index,
      answer: question.choices[index],
      score: question.scores?.[index] || {},
    };

    const finalP1 = [...player1Answers];
    const finalP2 = [...player2Answers];

    if (currentPlayer === 1) {
      finalP1.push(answerData);
    } else {
      finalP2.push(answerData);
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/api/analyze`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          player1: finalP1,
          player2: finalP2,
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
        "Result calculate cheyyan pattiyilla. Backend running aano?"
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // HANDLE ANSWER
  // ==========================================

  function handleAnswer(index) {
    const question = questions[currentQuestion];

    if (!question || loading) {
      return;
    }

    const answerData = {
      question_id: question.id,
      answer_index: index,
      answer: question.choices[index],
      score: question.scores?.[index] || {},
    };

    const isLastQuestion =
      currentQuestion === questions.length - 1;

    // ------------------------------------------
    // LAST QUESTION
    // ------------------------------------------

    if (isLastQuestion && currentPlayer === 2) {
      submitFinalAnswer(index);
      return;
    }

    // ------------------------------------------
    // SAVE ANSWER
    // ------------------------------------------

    if (currentPlayer === 1) {
      setPlayer1Answers((previous) => [
        ...previous,
        answerData,
      ]);

      setCurrentPlayer(2);
    } else {
      setPlayer2Answers((previous) => [
        ...previous,
        answerData,
      ]);

      setCurrentQuestion((previous) => previous + 1);

      setCurrentPlayer(1);
    }
  }

  // ==========================================
  // RESTART
  // ==========================================

  function restartGame() {
    setScreen("start");

    setCurrentQuestion(0);
    setCurrentPlayer(1);

    setPlayer1Answers([]);
    setPlayer2Answers([]);

    setResult(null);
    setError("");
    setLoading(false);
  }

  // ==========================================
  // START SCREEN
  // ==========================================

  if (screen === "start") {
    return (
      <div className="app">
        <div className="start-card">

          <div className="watermelon-icon">
            🍉
          </div>

          <h1>
            BITE THE
            <span> WATERMELON</span>
          </h1>

          <p className="subtitle">
            A ridiculous little game that secretly
            analyzes your choices.
          </p>

          <div className="input-area">

            <input
              type="text"
              placeholder="Player 1 nickname"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              maxLength={20}
            />

            <input
              type="text"
              placeholder="Player 2 nickname"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              maxLength={20}
            />

          </div>

          <button
            className="main-button"
            onClick={startGame}
          >
            🍉 START BITING
          </button>

          <p className="tiny-text">
            Entertainment & self-reflection only.
            Not a psychological or relationship diagnosis.
          </p>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // GAME SCREEN
  // ==========================================

  if (screen === "game") {

    const question = questions[currentQuestion];

    if (!question) {
      return (
        <div className="app">
          <div className="card">
            <h2>Loading 🍉...</h2>
          </div>
        </div>
      );
    }

    const progress =
      ((currentQuestion + 1) / questions.length) * 100;

    const playerName =
      currentPlayer === 1
        ? player1
        : player2;

    return (
      <div className="app">

        <div className="game-container">

          {/* HEADER */}

          <div className="game-header">

            <div className="logo">
              🍉 BITE THE WATERMELON
            </div>

            <div className="round">
              ROUND {currentQuestion + 1}
              {" / "}
              {questions.length}
            </div>

          </div>

          {/* PROGRESS */}

          <div className="progress-background">

            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* CURRENT PLAYER */}

          <div className="turn-card">

            <span className="turn-label">
              CURRENT BITER
            </span>

            <strong>
              {playerName}
            </strong>

          </div>

          {/* QUESTION */}

          <div className="question-card">

            <div className="question-number">
              🍉 QUESTION {question.id}
            </div>

            <h2 className="question-text">
              {question.scenario}
            </h2>

            <p className="choose-text">
              Nee entha cheyyum?
            </p>

          </div>

          {/* ANSWERS */}

          <div className="choices">

            {question.choices.map(
              (choice, index) => (

                <button
                  key={index}
                  className="choice-button"
                  onClick={() => handleAnswer(index)}
                  disabled={loading}
                >

                  <span className="choice-number">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>
                    {choice}
                  </span>

                </button>

              )
            )}

          </div>

          <p className="hidden-text">
            🤫 Your answer secretly adds watermelon seeds...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // RESULT SCREEN
  // ==========================================

  if (screen === "result") {

    if (!result) {
      return (
        <div className="app">
          <div className="card">
            <h2>
              Cutting the watermelon... 🍉
            </h2>
          </div>
        </div>
      );
    }

    const p1 = result.player1 || {};
    const p2 = result.player2 || {};

    return (
      <div className="app">

        <div className="result-container">

          {/* RESULT HEADER */}

          <div className="result-header">

            <div className="big-watermelon">
              🍉
            </div>

            <h1>
              WATERMELON
              <span> CUT!</span>
            </h1>

            <p>
              Okay... let's see what was hiding inside 👀
            </p>

          </div>

          {/* PLAYER RESULTS */}

          <div className="players-results">

            {/* PLAYER 1 */}

            <div className="result-card">

              <h2>
                🍉 {player1}
              </h2>

              <div className="personality">
                {p1.personality || "Watermelon Mystery 🍉"}
              </div>

              <div className="score-grid">

                <Score
                  name="Green"
                  value={p1.green_score}
                  icon="🟢"
                />

                <Score
                  name="Sweetness"
                  value={p1.sweetness}
                  icon="🍬"
                />

                <Score
                  name="Trust"
                  value={p1.trust}
                  icon="🤝"
                />

                <Score
                  name="Communication"
                  value={p1.communication}
                  icon="💬"
                />

                <Score
                  name="Empathy"
                  value={p1.empathy}
                  icon="❤️"
                />

                <Score
                  name="Maturity"
                  value={p1.maturity}
                  icon="🧠"
                />

              </div>

              <div className="seed-box">

                <h3>
                  🌱 SEEDS FOUND
                </h3>

                <strong>
                  {p1.seed_count ?? 0}
                </strong>

                <p>
                  {p1.biggest_seed || "No suspicious seed found 🍉"}
                </p>

              </div>

            </div>

            {/* PLAYER 2 */}

            <div className="result-card">

              <h2>
                🍉 {player2}
              </h2>

              <div className="personality">
                {p2.personality || "Watermelon Mystery 🍉"}
              </div>

              <div className="score-grid">

                <Score
                  name="Green"
                  value={p2.green_score}
                  icon="🟢"
                />

                <Score
                  name="Sweetness"
                  value={p2.sweetness}
                  icon="🍬"
                />

                <Score
                  name="Trust"
                  value={p2.trust}
                  icon="🤝"
                />

                <Score
                  name="Communication"
                  value={p2.communication}
                  icon="💬"
                />

                <Score
                  name="Empathy"
                  value={p2.empathy}
                  icon="❤️"
                />

                <Score
                  name="Maturity"
                  value={p2.maturity}
                  icon="🧠"
                />

              </div>

              <div className="seed-box">

                <h3>
                  🌱 SEEDS FOUND
                </h3>

                <strong>
                  {p2.seed_count ?? 0}
                </strong>

                <p>
                  {p2.biggest_seed || "No suspicious seed found 🍉"}
                </p>

              </div>

            </div>

          </div>

          {/* COMPARISON */}

          <div className="comparison-card">

            <h2>
              🍉 WATERMELON COMPARISON
            </h2>

            {result.comparison &&
            result.comparison.length > 0 ? (

              result.comparison.map(
                (item, index) => (

                  <p key={index}>
                    {item}
                  </p>

                )
              )

            ) : (

              <p>
                The watermelons are still arguing about
                who has more seeds. 🍉
              </p>

            )}

          </div>

          {/* RANDOM PREDICTION */}

          <div className="fun-card">

            <h2>
              🔮 RANDOM WATERMELON PREDICTION
            </h2>

            <p>
              {getPrediction(
                p1,
                p2,
                player1,
                player2
              )}
            </p>

          </div>

          {/* AGAIN */}

          <button
            className="main-button"
            onClick={restartGame}
          >
            🍉 BITE AGAIN
          </button>

          <p className="tiny-text">
            This game is for fun and self-reflection.
            It does not diagnose personality,
            relationships, or mental health.
          </p>

        </div>

      </div>
    );
  }

  return null;
}


// ======================================================
// SCORE COMPONENT
// ======================================================

function Score({
  name,
  value,
  icon,
}) {

  const safeValue = Number(value) || 0;

  const percentage = Math.max(
    0,
    Math.min(100, safeValue)
  );

  return (
    <div className="score-item">

      <div className="score-title">

        <span>
          {icon} {name}
        </span>

        <strong>
          {Math.round(percentage)}%
        </strong>

      </div>

      <div className="score-background">

        <div
          className="score-fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


// ======================================================
// RANDOM PREDICTION
// ======================================================

function getPrediction(
  p1,
  p2,
  name1,
  name2
) {

  const predictions = [

    `😂 ${name1} probably overthinks the famous "K" reply more.`,

    `🍉 ${name2} is more likely to say "I'm fine" while clearly NOT being fine.`,

    `🌱 Someone here definitely has a hidden seed called "${p1.biggest_seed || "mystery seed"}".`,

    `😂 ${name1} is probably the first one to send a meme after an argument.`,

    `👀 ${name2} looks more likely to remember a tiny argument from 6 months ago.`,

    `🍉 This watermelon has suspiciously similar personalities.`,

    `🌱 The seeds are small now... but somebody is collecting them.`,

    `😂 One of you says "whatever" but absolutely does NOT mean whatever.`,

    `❤️ ${
      Number(p1.empathy || 0) >
      Number(p2.empathy || 0)
        ? name1
        : name2
    } wins the empathy battle.`,

    `💬 ${
      Number(p1.communication || 0) >
      Number(p2.communication || 0)
        ? name1
        : name2
    } is more likely to say "let's just talk about it."`,

  ];

  return predictions[
    Math.floor(
      Math.random() * predictions.length
    )
  ];
}

export default App;