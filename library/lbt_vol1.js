document.addEventListener("DOMContentLoaded", () => {

    const content = document.querySelector(".content");
    if (!content) return;

    const originalHTML = content.innerHTML;

    const messages = [
        "Mizuki?",
        "It's me.",
        "Believe me.",
        "I miss you."
    ];

    function randomMessage() {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function glitch(duration) {

        const message = randomMessage();

        content.innerHTML = originalHTML.replace(
            "User: Guest",
            `User: ${message}`
        );

        setTimeout(() => {
            content.innerHTML = originalHTML;
        }, duration);

    }

    // -----------------------------
    // First page load
    // 50% chance
    // -----------------------------
    if (Math.random() < 0.5) {

        const initialDelay = 800 + Math.random() * 2500;
        const duration = 2200 + Math.random() * 1800;

        setTimeout(() => {
            glitch(duration);
        }, initialDelay);
    }

    // -----------------------------
    // Every 30 seconds
    // 30% chance
    // -----------------------------
    setInterval(() => {

        if (Math.random() < 0.30) {

            const duration = 800 + Math.random() * 700;
            glitch(duration);

        }

    }, 30000);

});

document.addEventListener("DOMContentLoaded", () => {

    const genre = document.querySelector(".genre");
    if (!genre) return;

    const stages = [
        "Genre: Psychological, Slice of Life, Mystery, Romance",
        "Genre: Psychological, Slice øf Life, Mystery, Romance",
        "Genre: Psychological, Slice øf L¡fe, Mystery, Rømance",
        "Genre: Psychological, ███████████, Mystery, Love",
        "Genre: Psychological Horror, Mystery, Love"
    ];

    const delay = 10000 + Math.random() * 5000; // 10–15 seconds

    setTimeout(() => {

        let stage = 0;

        function nextStage() {

            genre.style.transition = "opacity .08s";
            genre.style.opacity = "0.25";

            setTimeout(() => {

                genre.textContent = stages[stage];
                genre.style.opacity = "1";

                stage++;

                if (stage < stages.length) {

                    const pause = stage === stages.length - 1
                        ? 220
                        : 120 + Math.random() * 80;

                    setTimeout(nextStage, pause);
                }

            }, 55);

        }

        nextStage();

    }, delay);

});
