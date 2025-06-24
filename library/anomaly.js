document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains("triggered")) {
        const el = entry.target;
        el.classList.add("triggered");

        startAnomalySequence(el);

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0% 0% -64% 0%"
  });

  document.querySelectorAll(".anomaly").forEach(el => observer.observe(el));
});

function startAnomalySequence(el) {
  const terminal = document.getElementById("terminal");
  const glitchTarget = document.getElementById("glitch-overlay");
  const originalText = el.textContent;
  const group = el.closest('.anomaly-group');

  if (glitchTarget) {
    glitchTarget.classList.add("rgb-glitch");

    const burst = [150, 250, 400, 550, 700];
    burst.forEach(t => {
      setTimeout(() => glitchTarget.classList.remove("rgb-glitch"), t);
      setTimeout(() => glitchTarget.classList.add("rgb-glitch"), t + 50);
    });

    setTimeout(() => glitchTarget.classList.remove("rgb-glitch"), 1200);
  }

  // Phase 1: Detected [Blink Red]
  if (terminal && group && !group.dataset.phase1Logged) {
    appendTerminalLine(">>> Cross-timeline leakage: Ophiuchus-3491 → Cassiopeia-25741", terminal);
    group.dataset.phase1Logged = "true";
  }

  // Phase 2: Obfuscate [Scramble]
  setTimeout(() => {
    scrambleText(originalText, 10, 80, scrambled => {
      el.textContent = scrambled;
    });

    if (terminal && group && !group.dataset.phase2Logged) {
      appendTerminalLine(">>> Executing memory purge...", terminal);
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
          if (glitchTarget) glitchTarget.classList.remove("rgb-glitch");

          if (group && terminal && !group.dataset.phase3Logged) {
            appendTerminalLine(">>> Residual anomaly successfully contained.", terminal);
            group.dataset.phase3Logged = "true";
          }
        }
      }, 1100); // erased
    }, 1200); // scramble
  }, 1800); // blink red
}

function scrambleText(text, cycles = 10, interval = 80, callback) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@#$%^&*';
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

function appendTerminalLine(line, terminal) {
  let last = terminal.lastElementChild;

  if (!last || last.tagName !== "P" || last.classList.contains("static-terminal")) {
    last = document.createElement("p");
    terminal.appendChild(last);
  }

  last.innerHTML += (last.innerHTML ? "<br>" : "") + line;
}
