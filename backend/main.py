from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Bite The Watermelon API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


QUESTIONS = [
    {
        "id": 1,
        "scenario": "Your message has been seen, but there is no reply. What do you do?",
        "choices": [
            "They might be busy, so I will wait.",
            "I will send a follow-up message.",
            "I will check if they are online.",
            "I will assume they ignored me and stay silent."
        ],
        "scores": [
            {"green": 10, "sweetness": 10, "trust": 15, "communication": 10, "empathy": 15, "maturity": 15},
            {"green": 15, "sweetness": 15, "trust": 10, "communication": 20, "empathy": 10, "maturity": 10},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
        ],
    },
    {
        "id": 2,
        "scenario": "Your friend makes a mistake. What do you do?",
        "choices": [
            "Help them fix it.",
            "Laugh at them.",
            "Tell everyone what happened.",
            "Ignore them."
        ],
        "scores": [
            {"green": 15, "sweetness": 15, "trust": 15, "communication": 15, "empathy": 20, "maturity": 15},
            {"green": 5, "sweetness": 0, "trust": 5, "communication": 5, "empathy": 0, "maturity": 5},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
        ],
    },
    {
        "id": 3,
        "scenario": "Someone disagrees with you. What do you do?",
        "choices": [
            "Listen to their point.",
            "Argue until they agree.",
            "Stop talking to them.",
            "Make fun of their opinion."
        ],
        "scores": [
            {"green": 15, "sweetness": 10, "trust": 15, "communication": 20, "empathy": 15, "maturity": 20},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 0, "empathy": 5, "maturity": 5},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
        ],
    },
    {
        "id": 4,
        "scenario": "Your friend tells you a secret.",
        "choices": [
            "Keep it private.",
            "Tell one close friend.",
            "Post a hint online.",
            "Tell everyone."
        ],
        "scores": [
            {"green": 20, "sweetness": 15, "trust": 25, "communication": 10, "empathy": 15, "maturity": 20},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
        ],
    },
    {
        "id": 5,
        "scenario": "You promised to help someone, but you become busy.",
        "choices": [
            "Tell them honestly and reschedule.",
            "Disappear without explaining.",
            "Pretend you forgot.",
            "Blame them."
        ],
        "scores": [
            {"green": 15, "sweetness": 15, "trust": 15, "communication": 20, "empathy": 15, "maturity": 20},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
        ],
    },
    {
        "id": 6,
        "scenario": "Someone is having a bad day.",
        "choices": [
            "Ask if they are okay.",
            "Give them some space.",
            "Make jokes about it.",
            "Ignore them completely."
        ],
        "scores": [
            {"green": 15, "sweetness": 20, "trust": 15, "communication": 15, "empathy": 25, "maturity": 15},
            {"green": 10, "sweetness": 10, "trust": 10, "communication": 5, "empathy": 15, "maturity": 15},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
        ],
    },
    {
        "id": 7,
        "scenario": "Your friend gets better marks than you.",
        "choices": [
            "Congratulate them.",
            "Feel jealous but stay quiet.",
            "Ask how they studied.",
            "Say their marks don't matter."
        ],
        "scores": [
            {"green": 15, "sweetness": 20, "trust": 15, "communication": 10, "empathy": 15, "maturity": 20},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 15, "sweetness": 15, "trust": 15, "communication": 15, "empathy": 10, "maturity": 20},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
        ],
    },
    {
        "id": 8,
        "scenario": "You accidentally hurt someone's feelings.",
        "choices": [
            "Apologize and understand why.",
            "Say they are too sensitive.",
            "Ignore it.",
            "Make another joke."
        ],
        "scores": [
            {"green": 20, "sweetness": 20, "trust": 20, "communication": 20, "empathy": 25, "maturity": 25},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 0, "empathy": 5, "maturity": 5},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
        ],
    },
    {
        "id": 9,
        "scenario": "Your friend cancels plans at the last minute.",
        "choices": [
            "Ask what happened.",
            "Get angry immediately.",
            "Never talk to them again.",
            "Cancel their future plans too."
        ],
        "scores": [
            {"green": 15, "sweetness": 15, "trust": 15, "communication": 20, "empathy": 15, "maturity": 20},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
            {"green": 0, "sweetness": 0, "trust": 0, "communication": 0, "empathy": 0, "maturity": 0},
        ],
    },
    {
        "id": 10,
        "scenario": "You find out that your friend misunderstood something you said.",
        "choices": [
            "Explain calmly.",
            "Tell them they are wrong.",
            "Stop talking.",
            "Argue about it."
        ],
        "scores": [
            {"green": 15, "sweetness": 15, "trust": 15, "communication": 25, "empathy": 20, "maturity": 20},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 0, "empathy": 5, "maturity": 5},
            {"green": 5, "sweetness": 5, "trust": 5, "communication": 5, "empathy": 5, "maturity": 5},
        ],
    },
]


class Answer(BaseModel):
    question_id: int
    answer_index: int
    answer: str
    score: dict


class AnalysisRequest(BaseModel):
    player1: List[Answer]
    player2: Optional[List[Answer]] = None


@app.get("/")
def home():
    return {
        "message": "Bite The Watermelon API is running 🍉",
        "status": "healthy"
    }


@app.get("/api/questions")
def get_questions():
    return {
        "count": len(QUESTIONS),
        "questions": QUESTIONS
    }


def calculate_result(answers):
    categories = [
        "green",
        "sweetness",
        "trust",
        "communication",
        "empathy",
        "maturity",
    ]

    totals = {category: 0 for category in categories}

    for answer in answers:
        score = answer.get("score", {})
        for category in categories:
            totals[category] += float(score.get(category, 0))

    max_possible = len(answers) * 25

    if max_possible == 0:
        percentages = {category: 0 for category in categories}
    else:
        percentages = {
            category: round(
                min(100, max(0, totals[category] / max_possible * 100)), 1
            )
            for category in categories
        }

    average = sum(percentages.values()) / len(categories)

    if average >= 85:
        personality = "The Sweetest Watermelon 🍉💚"
    elif average >= 70:
        personality = "The Golden Watermelon 🌟🍉"
    elif average >= 50:
        personality = "The Balanced Watermelon ⚖️🍉"
    elif average >= 30:
        personality = "The Mystery Watermelon 👀🍉"
    else:
        personality = "The Sour Watermelon 😅🍉"

    seed_count = sum(
        1 for answer in answers
        if answer.get("answer_index", 0) >= 2
    )

    biggest = max(
        categories,
        key=lambda x: percentages[x]
    )

    return {
        "personality": personality,
        "green_score": percentages["green"],
        "sweetness": percentages["sweetness"],
        "trust": percentages["trust"],
        "communication": percentages["communication"],
        "empathy": percentages["empathy"],
        "maturity": percentages["maturity"],
        "seed_count": seed_count,
        "biggest_seed": f"Your strongest quality is {biggest.title()} 🍉"
    }


@app.post("/api/analyze")
def analyze(request: AnalysisRequest):
    result1 = calculate_result(
        [answer.model_dump() for answer in request.player1]
    )

    response = {
        "player1": result1
    }

    if request.player2:
        result2 = calculate_result(
            [answer.model_dump() for answer in request.player2]
        )

        comparison = []

        if result1["green_score"] > result2["green_score"]:
            comparison.append("Player 1 has more green energy! 🟢")
        elif result2["green_score"] > result1["green_score"]:
            comparison.append("Player 2 has more green energy! 🟢")
        else:
            comparison.append("Both players have equal green energy! 🟢")

        if result1["empathy"] > result2["empathy"]:
            comparison.append("Player 1 wins the empathy seeds! ❤️")
        elif result2["empathy"] > result1["empathy"]:
            comparison.append("Player 2 wins the empathy seeds! ❤️")
        else:
            comparison.append("Both players have equal empathy! ❤️")

        response["player2"] = result2
        response["comparison"] = comparison

    return response