from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.questions import QUESTIONS
from backend.scoring import calculate_player_score, compare_players


# =========================================================
# PROJECT PATH
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

FRONTEND_DIST = BASE_DIR / "frontend" / "dist"


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Bite The Watermelon",
    description="🍉 Bite The Watermelon Game Backend",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATA MODELS
# =========================================================

class PlayerAnswers(BaseModel):
    answers: list


class GameResult(BaseModel):
    player1: list
    player2: list


# =========================================================
# HOME / HEALTH CHECK
# =========================================================

@app.get("/")
def home():

    return {
        "message": "🍉 BITE THE WATERMELON API is running!",
        "status": "healthy"
    }


# =========================================================
# QUESTIONS API
# =========================================================

@app.get("/api/questions")
def get_questions():

    return {
        "count": len(QUESTIONS),
        "questions": QUESTIONS
    }


# =========================================================
# GAME ANALYSIS
# =========================================================

@app.post("/api/analyze")
def analyze_game(game: GameResult):

    player1_result = calculate_player_score(
        game.player1
    )

    player2_result = calculate_player_score(
        game.player2
    )

    comparison = compare_players(
        player1_result,
        player2_result
    )

    return {
        "player1": player1_result,
        "player2": player2_result,
        "comparison": comparison
    }


# =========================================================
# SERVE REACT FRONTEND
# =========================================================

if FRONTEND_DIST.exists():

    assets_folder = FRONTEND_DIST / "assets"

    if assets_folder.exists():

        app.mount(
            "/assets",
            StaticFiles(
                directory=str(assets_folder)
            ),
            name="assets"
        )


    @app.get("/app")
    def serve_app():

        return FileResponse(
            str(FRONTEND_DIST / "index.html")
        )


    @app.get("/{path:path}")
    def serve_react(path: str):

        requested_file = FRONTEND_DIST / path

        if requested_file.is_file():

            return FileResponse(
                str(requested_file)
            )

        return FileResponse(
            str(FRONTEND_DIST / "index.html")
        )