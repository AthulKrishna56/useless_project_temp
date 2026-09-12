<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# BITE THE WATERMELON 🍉🎯

## Basic Details

### Team Name: DareDevil

### Team Members

* Team Lead: Aswin Lal - Sree Narayana Gurukulam College of Engeneering
* Member 2: Athul Krishna Biju - Sree Narayana Gurukulam College of Engeneering

  
### Project Description

**BITE THE WATERMELON** is a fun 2-player game that secretly analyzes how players react to random everyday situations.

Instead of boring "Green Flag / Red Flag" results, the game turns player behavior into a **watermelon** — showing sweetness, seeds, bitter bites, emotional depth, and a funny watermelon personality at the end. 🍉🌱

### The Problem (that doesn't exist)

People have absolutely no idea what their watermelon personality is.

How are you supposed to know:

* Who overthinks a "K" reply? 🤔
* Who gets jealous first? 👀
* Who apologizes first? 🙏
* Who remembers an argument from 3 months ago? 🧠
* Who has the most watermelon seeds? 🌱

Clearly, this is a serious problem that nobody asked us to solve.

### The Solution (that nobody asked for)

We created **BITE THE WATERMELON**.

Two players answer random situations without knowing what their answers are actually measuring.

Behind the scenes, the game secretly tracks things like:

🍬 Sweetness
❤️ Empathy
🤝 Trust
💬 Communication
🧠 Maturity
👀 Jealousy
🌀 Overthinking
😤 Ego
🌱 Seeds

At the end, the watermelon gets "cut open" and players discover what is actually inside. 🍉🔪

Because apparently, relationships needed a fruit-based analysis system.

---

## Technical Details

### Technologies/Components Used

### For Software:

* **Languages:** Python, JavaScript, HTML, CSS
* **Frontend:** React + Vite
* **Backend:** FastAPI
* **Libraries:** Pydantic, Uvicorn, PyWebView
* **Desktop Packaging:** PyInstaller
* **Development Tools:** VS Code, PowerShell, Git, GitHub

### For Hardware:

**No hardware required.**

This is a completely software-based project. 🍉💻

---

## Implementation

### For Software:

The project uses a **React frontend** connected to a **FastAPI backend**.

The frontend handles:

* Player names
* Game interface
* Questions
* Answer selection
* Progress
* Results
* Watermelon-themed UI

The backend handles:

* Question delivery
* Hidden scoring
* Personality calculation
* Seed detection
* Player comparison
* Final analysis

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/BITE-THE-WATERMELON.git
cd BITE-THE-WATERMELON
```

Create a Python virtual environment:

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

Install backend dependencies:

```powershell
cd backend
pip install -r requirements.txt
```

Install frontend dependencies:

```powershell
cd ..\frontend
npm install
```

Build the frontend:

```powershell
npm run build
```

### Run

Return to the project root:

```powershell
cd ..
python launcher.py
```

The desktop application will open automatically.

---

## Project Documentation

### For Software:

### Game Flow

```text
START
  ↓
Enter Player 1 Name
  ↓
Enter Player 2 Name
  ↓
🍉 Game Begins
  ↓
Random Everyday Scenario
  ↓
Player Chooses Reaction
  ↓
Hidden Scoring
  ↓
Switch Player
  ↓
More Scenarios
  ↓
Final Analysis
  ↓
🍉 WATERMELON REVEAL
  ↓
Personality + Sweetness + Seeds
  ↓
Player Comparison
  ↓
Funny Predictions
  ↓
END
```

---

# Screenshots

![Screenshot1](Add screenshot of the game start screen here)

*The starting screen where two players enter their nicknames before beginning the game.*

![Screenshot2](Add screenshot of the question screen here)

*The gameplay screen showing an everyday scenario with four possible reactions.*

![Screenshot3](Add screenshot of the final result screen here)

*The final watermelon analysis showing personality, sweetness, scores, seeds and player comparison.*

---

# Diagrams

![Workflow](Add your workflow or architecture diagram here)

*Architecture showing the React frontend communicating with the FastAPI backend for questions, scoring and final analysis.*

### System Architecture

```text
                 🍉 BITE THE WATERMELON
                         │
                         ▼
                ┌─────────────────┐
                │  React + Vite   │
                │    Frontend     │
                └────────┬────────┘
                         │
                         │ HTTP Requests
                         ▼
                ┌─────────────────┐
                │     FastAPI     │
                │     Backend     │
                └────────┬────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       ┌─────────────┐       ┌─────────────┐
       │  Questions  │       │   Scoring   │
       │    Bank     │       │    Engine   │
       └─────────────┘       └──────┬──────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │ Final Analysis  │
                           │ & Comparison    │
                           └─────────────────┘
                                    │
                                    ▼
                              🍉 RESULT
```

---

## How the Scoring Works

Every answer has hidden scoring values.

For example:

```text
Player chooses an answer
          ↓
 ┌─────────────────────┐
 │ Hidden Score Update │
 └──────────┬──────────┘
            │
     ┌──────┼──────┬────────┐
     ▼      ▼      ▼        ▼
   Trust  Empathy  Ego   Overthinking
     │      │      │        │
     └──────┴──────┴────────┘
                │
                ▼
          Final Watermelon
```

The game calculates values such as:

* Green Score
* Red Score
* Sweetness
* Trust
* Communication
* Empathy
* Maturity
* Patience
* Boundaries
* Independence
* Humor
* Accountability
* Seed Count
* Bitter Seed Score

---

## 🍉 Watermelon Personality System

Players can receive different funny personalities depending on their answers.

Examples:

```text
🍉 PURE WATERMELON
🍉🌱 SWEET BUT SEEDED
🌱😂 SEED COLLECTOR
❤️🍉 EMOTIONAL WATERMELON
🌶️🍉 SPICY WATERMELON
👀🍉 MYSTERY WATERMELON
🤝🍉 TRUST MELON
😂🍉 FUNNY MELON
🛡️🍉 BOUNDARY MELON
```

---

## 🌱 Seed System

Seeds represent small behavioral patterns discovered through the game.

Examples:

```text
🌱 Overthinking
🌱 Jealousy
🌱 Ego
🌱 Avoidance
🌱 Resentment
```

Repeated patterns increase the **Bitter Seed Score**.

The system is designed as a playful game mechanic rather than a serious psychological assessment.

---

## Project Demo

# Video

[Add your demo video link here]

*The demo video demonstrates the complete gameplay flow — entering players, answering scenarios, hidden scoring, and revealing the final watermelon personalities.*

# Additional Demos

* Add GitHub repository link
* Add gameplay GIF
* Add presentation/demo slides
* Add screenshots
* Add future AI analysis demo

---

## Team Contributions

* **[Team Lead Name]:** Project idea, game design, backend development, scoring system and integration.
* **[Member 2]:** Frontend development, UI/UX design and game screens.
* **[Member 3]:** Question bank, testing, gameplay logic and documentation.

---

## ⚠️ Disclaimer

**BITE THE WATERMELON is an entertainment and self-reflection game.**

The scores, personality types, seeds and predictions are designed for fun and should **not** be considered psychological, medical or relationship diagnoses.

🍉 Everyone has a few seeds.

---

## Future Improvements

* 🤖 AI-generated personalized explanations
* 🎲 More random scenarios
* 🍉 Animated watermelon cutting
* 🌱 More seed categories
* 📊 Advanced player comparison
* 📸 Shareable result cards
* 🏆 Leaderboards
* 🌐 Online multiplayer
* 📱 Mobile version
* 🔊 Sound effects and music

---

# 🍉 Final Thought

> **Don't judge the watermelon from the outside.**
>
> **Take a bite.**

---

Made with ❤️ at **TinkerHub Useless Projects**

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000\&link=https%3A%2F%2Fwww.tinkerhub.org%2F)

![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
