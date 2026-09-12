import time
import threading
import urllib.request

import uvicorn
import webview

from backend.main import app


# =========================================================
# START FASTAPI
# =========================================================

def start_server():

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        log_level="warning"
    )


# =========================================================
# WAIT FOR SERVER
# =========================================================

def wait_for_server():

    for _ in range(100):

        try:

            urllib.request.urlopen(
                "http://127.0.0.1:8000/",
                timeout=0.2
            )

            return True

        except Exception:

            time.sleep(0.1)


    return False


# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":

    server_thread = threading.Thread(
        target=start_server,
        daemon=True
    )

    server_thread.start()


    if not wait_for_server():

        raise RuntimeError(
            "Could not start BITE THE WATERMELON server."
        )


    # -----------------------------------------------------
    # DESKTOP GAME WINDOW
    # -----------------------------------------------------

    webview.create_window(

        "🍉 BITE THE WATERMELON",

        "http://127.0.0.1:8000/app",

        width=1200,

        height=800,

        min_size=(900, 650),

        resizable=True

    )


    webview.start()