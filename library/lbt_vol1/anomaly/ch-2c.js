document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("detected")) {
        const el = entry.target;
        el.classList.add("detected");

        purgeTimelineLeak(el);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0% 0% -64% 0%"
  });

  document.querySelectorAll(".ophiuchus-3491").forEach(el => observer.observe(el));
});

function purgeTimelineLeak(el) {
  const terminal = document.getElementById("terminal");
  const glitchOverlay = document.getElementById("glitch-overlay");
  const originalText = el.textContent;
  const group = el.closest('.timeline-leakage');

  if (glitchOverlay) {
    const flickers = [200, 600, 1000];
    glitchOverlay.classList.add("rgb-glitch");

    flickers.forEach((t, i) => {
      setTimeout(() => glitchOverlay.classList.remove("rgb-glitch"), t);
      setTimeout(() => glitchOverlay.classList.add("rgb-glitch"), t + 100);
    });

    setTimeout(() => glitchOverlay.classList.remove("rgb-glitch"), 1600);
  }

  // Phase 1: Detected [Blink Red]
  if (terminal && group && !group.dataset.phase1Logged) {
    logTerminal(">>> Cross-timeline leakage: Ophiuchus-3491 → Cassiopeia-25741", terminal);
    group.dataset.phase1Logged = "true";
  }

  // Phase 2: Obfuscate [Scramble]
  setTimeout(() => {
    obfuscateText(originalText, 10, 80, scrambled => {
      el.textContent = scrambled;
    });

    if (terminal && group && !group.dataset.phase2Logged) {
      logTerminal(">>> Executing memory purge...", terminal);
      group.dataset.phase2Logged = "true";
    }

    // Phase 3: Purge [Erase]
    setTimeout(() => {
      el.classList.remove("triggered");
      el.style.color = "red";
      el.style.transition = "opacity 0.5s ease, margin 0.8s ease, height 0.8s ease";
      el.style.opacity = "0";
      el.style.margin = "0";
      el.style.padding = "0";
      el.style.height = "0";
      el.style.overflow = "hidden";
      el.dataset.erased = "true";

      setTimeout(() => {
        const remaining = group.querySelectorAll('.anomaly:not([data-erased="true"])');

        if (remaining.length === 0) {
          if (glitchOverlay) glitchOverlay.classList.remove("rgb-glitch");

          if (group && terminal && !group.dataset.phase3Logged) {
            logTerminal(">>> Residual anomaly successfully contained.", terminal);
            group.dataset.phase3Logged = "true";
          }
        }
      }, 1100); // erased
    }, 1200); // scramble
  }, 1800); // blink red
}

function obfuscateText(text, cycles = 10, interval = 80, callback) {
  const chars = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž';
  const original = text.split('');
  let currentCycle = 0;

  const scrambleInterval = setInterval(() => {
    const scrambled = original.map((char, i) =>
      Math.random() < 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char
    );

    callback(scrambled.join(''));
    currentCycle++;

    if (currentCycle >= cycles) {
      clearInterval(scrambleInterval);
    }
  }, interval);
}

function logTerminal(line, terminal) {
  let last = terminal.lastElementChild;

  if (!last || last.tagName !== "P" || last.classList.contains("static-terminal")) {
    last = document.createElement("p");
    terminal.appendChild(last);
  }

  last.innerHTML += (last.innerHTML ? "<br>" : "") + line;
}
