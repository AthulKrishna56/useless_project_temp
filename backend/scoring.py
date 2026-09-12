from collections import Counter


def calculate_player_score(answers):

    metrics = Counter()
    seeds = Counter()

    # -----------------------------------------------------
    # READ ANSWERS
    # -----------------------------------------------------

    for answer in answers:

        score = answer.get("score", {})

        if not isinstance(score, dict):
            continue

        for key, value in score.items():

            if key == "seed":

                seeds[value] += 1

            else:

                try:
                    metrics[key] += float(value)
                except (TypeError, ValueError):
                    pass


    # -----------------------------------------------------
    # PERCENTAGE HELPER
    # -----------------------------------------------------

    def percentage(value):

        return round(
            max(0, min(100, value)),
            1
        )


    # -----------------------------------------------------
    # MAIN METRICS
    # -----------------------------------------------------

    trust = percentage(
        50 + metrics["trust"] * 5
    )

    communication = percentage(
        50 + metrics["communication"] * 5
    )

    empathy = percentage(
        50 + metrics["empathy"] * 5
    )

    sweetness = percentage(
        50 + metrics["sweetness"] * 5
    )

    maturity = percentage(
        50 + metrics["maturity"] * 5
    )

    patience = percentage(
        50 + metrics["patience"] * 5
    )

    boundaries = percentage(
        50 + metrics["boundaries"] * 5
    )

    independence = percentage(
        50 + metrics["independence"] * 5
    )

    humor = percentage(
        50 + metrics["humor"] * 5
    )

    accountability = percentage(
        50 + metrics["accountability"] * 5
    )


    # -----------------------------------------------------
    # GREEN SCORE
    # -----------------------------------------------------

    green = percentage(
        50
        + (
            metrics["trust"]
            + metrics["communication"]
            + metrics["empathy"]
            + metrics["maturity"]
            + metrics["patience"]
            + metrics["boundaries"]
        ) * 2
    )


    # -----------------------------------------------------
    # RED / SPICY SCORE
    # -----------------------------------------------------

    red = percentage(
        50
        + (
            metrics["resentment"]
            + metrics["jealousy"]
            + metrics["ego"]
            + metrics["overthinking"]
        ) * 4
    )


    # -----------------------------------------------------
    # SEEDS
    # -----------------------------------------------------

    total_seeds = sum(seeds.values())


    # -----------------------------------------------------
    # BITTER SEED SCORE
    # -----------------------------------------------------

    bitter_seed_score = percentage(
        total_seeds * 10
        + max(0, metrics["resentment"] * 3)
        + max(0, metrics["ego"] * 2)
        + max(0, metrics["jealousy"] * 2)
        + max(0, metrics["overthinking"] * 2)
    )


    # -----------------------------------------------------
    # PERSONALITY
    # -----------------------------------------------------

    if sweetness >= 75 and total_seeds <= 2:

        personality = "PURE WATERMELON 🍉"

    elif sweetness >= 65 and total_seeds <= 5:

        personality = "SWEET BUT SEEDED 🍉🌱"

    elif total_seeds >= 7:

        personality = "SEED COLLECTOR 🌱😂"

    elif empathy >= 75:

        personality = "EMOTIONAL WATERMELON ❤️"

    elif metrics["ego"] >= 5:

        personality = "SPICY WATERMELON 🌶️🍉"

    elif trust >= 75:

        personality = "TRUST MELON 🤝🍉"

    elif humor >= 75:

        personality = "FUNNY MELON 😂🍉"

    elif boundaries >= 75:

        personality = "BOUNDARY MELON 🛡️🍉"

    else:

        personality = "MYSTERY WATERMELON 👀🍉"


    # -----------------------------------------------------
    # BIGGEST SEED
    # -----------------------------------------------------

    if seeds:

        biggest_seed = seeds.most_common(1)[0][0]

    else:

        biggest_seed = "No major seed discovered"


    # -----------------------------------------------------
    # RETURN RESULT
    # -----------------------------------------------------

    return {

        "green_score": green,

        "red_score": red,

        "sweetness": sweetness,

        "trust": trust,

        "communication": communication,

        "empathy": empathy,

        "maturity": maturity,

        "patience": patience,

        "boundaries": boundaries,

        "independence": independence,

        "humor": humor,

        "accountability": accountability,

        "seed_count": total_seeds,

        "bitter_seed_score": bitter_seed_score,

        "seeds": dict(seeds),

        "biggest_seed": biggest_seed,

        "personality": personality
    }


# =========================================================
# PLAYER COMPARISON
# =========================================================

def compare_players(player1, player2):

    differences = []

    metrics = [

        ("Communication", "communication"),

        ("Trust", "trust"),

        ("Empathy", "empathy"),

        ("Sweetness", "sweetness"),

        ("Maturity", "maturity"),

        ("Patience", "patience"),

        ("Boundaries", "boundaries"),

        ("Humor", "humor")

    ]


    for name, key in metrics:

        difference = abs(
            player1[key] - player2[key]
        )


        if difference >= 20:

            if player1[key] > player2[key]:

                differences.append(
                    f"🍉 {name} — Player 1 is noticeably higher."
                )

            else:

                differences.append(
                    f"🍉 {name} — Player 2 is noticeably higher."
                )


    if not differences:

        differences.append(
            "🍉 Same wavelength! "
            "Your answers were surprisingly similar."
        )


    return differences