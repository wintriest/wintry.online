document.addEventListener("DOMContentLoaded", () => {
    const atr = document.getElementById("atr");
    if (!atr) return;

    const chars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž";

    function randomGlyphs(length = 3) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    function scrambleLoop() {
        atr.textContent = randomGlyphs();

        // Random delay between 0.8s and 5.9s
        const delay = Math.random() * (5900 - 800) + 800;

        setTimeout(scrambleLoop, delay);
    }

    scrambleLoop();
});

document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("figure");
    const target = document.getElementById("looking");

    if (!trigger || !target) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();

                // Replace with your desired text
                target.textContent = "Anomalous figure detected…?";
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: "0% 0% -20% 0%"
    });

    observer.observe(trigger);
});

document.addEventListener("DOMContentLoaded", () => {
    const leak = document.getElementById("leak");
    if (!leak) return;

    const originalHTML = leak.innerHTML;

    const chars = "¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž";

    function randomString(length) {
        let out = "";
        for (let i = 0; i < length; i++) {
            out += chars[Math.floor(Math.random() * chars.length)];
        }
        return out;
    }

    function scheduleLeak() {
        const delay = 15000 + Math.random() * 15000;
        setTimeout(beginLeak, delay);
    }

    function beginLeak() {

        // How many bursts this leak has
        const bursts = Math.floor(Math.random() * 8) + 4; // 4–11 bursts

        let currentBurst = 0;

        function burst() {

            // Finished all bursts
            if (currentBurst >= bursts) {
                leak.innerHTML = originalHTML;
                scheduleLeak();
                return;
            }

            currentBurst++;

            // -----------------------
            // LEAK ON
            // -----------------------

            leak.innerHTML = `
                <a href="./atr.html" class="nav-button">
                    <span id="entry">Chapter 3</span> →
                </a>
            `;

            const entry = document.getElementById("entry");
            const originalText = "Chapter 3";

            const scramble = setInterval(() => {
                entry.textContent = randomString(originalText.length);
            }, 20 + Math.random() * 20);

            // Random burst duration
            // Most are short
            // Some are long enough to click
            let onTime;

            const chance = Math.random();

            if (chance < 0.60) {
                // quick spark
                onTime = 80 + Math.random() * 250;
            }
            else if (chance < 0.90) {
                // medium
                onTime = 500 + Math.random() * 1200;
            }
            else {
                // rare long stable leak
                onTime = 2500 + Math.random() * 4500;
            }

            setTimeout(() => {

                clearInterval(scramble);

                leak.innerHTML = originalHTML;

                // Random outage before next spark
                const offTime = 40 + Math.random() * 900;

                setTimeout(burst, offTime);

            }, onTime);
        }

        burst();
    }

    scheduleLeak();
});