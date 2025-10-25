document.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector(".japanese");
    const translatedText = "Just to reach the end of this journey with you by my side…";
    let hasSwitched = false;

    function eraseText(element, delay = 40, callback) {
        let text = element.textContent;
        let i = text.length;

        function step() {
            if (i >= 0) {
                element.textContent = text.substring(0, i);
                i--;
                setTimeout(step, delay);
            } else {
                callback();
            }
        }

        step();
    }

    function typeWrite(element, newText, delay = 40) {
        let i = 0;

        function step() {
            if (i <= newText.length) {
                element.textContent = newText.substring(0, i);
                i++;
                setTimeout(step, delay);
            }
        }

        step();
    }

    function isElementCentered(element) {
        const rect = element.getBoundingClientRect();
        const centerY = window.innerHeight / 2;
        return rect.top <= centerY && rect.bottom >= centerY;
    }

    function checkPosition() {
        if (!hasSwitched && isElementCentered(target)) {
            hasSwitched = true;
            target.classList.remove("japanese");

            eraseText(target, 40, () => {
                setTimeout(() => {
                    typeWrite(target, translatedText, 40);
                }, 400);
            });
        }
    }

    window.addEventListener("scroll", checkPosition);
    window.addEventListener("resize", checkPosition);
    checkPosition();
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("detect-point");
  if (!trigger) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.disconnect();
        purgeTimelineLeak(trigger);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: "0% 0% -20% 0%"
  });

  observer.observe(trigger);
});

document.querySelectorAll(".timeline-correction p").forEach(p => {
  Object.assign(p.style, {
    visibility: "hidden",
    opacity: "0",
    margin: "0",
    padding: "0",
    height: "0",
    overflow: "hidden"
  });
});

async function purgeTimelineLeak(triggerEl) {
  const terminal = document.getElementById("terminal");
  const group = triggerEl.closest('.timeline-leakage');
  const anomaly = group.querySelectorAll('.anomaly');
  const timelineCorrection = document.querySelector('.timeline-correction');

  disableScroll();

  // Phase 1: Blinking Text
  anomaly.forEach(p => {
    p.classList.add("blink-red");
    p.dataset.originalText = p.textContent;
  });

  logTerminal(">>> Cross-timeline leakage: Ophiuchus-3491 → Cassiopeia-25741", terminal);
  await wait(3400);

  // Phase 2: Auto-Scroll
  await autoScroll("restore-point");
  disableScroll();

  // Phase 3: Scramble Text
  anomaly.forEach(p => scrambleText(p));
  logTerminal(">>> Executing memory purge...", terminal);

  await wait(1500);
  enableScroll();

  // Phase 4: Erasure
  logTerminal(">>> Redacting residual anomaly…", terminal);
  anomaly.forEach(p => {
    p.classList.remove("blink-red");
    clearInterval(p._scrambleInterval);
  });
  await Promise.all([...anomaly].map(backspaceErasure));

  await wait(700);
  // Phase 5: Timeline Correction
  if (timelineCorrection) {
    const paragraphs = timelineCorrection.querySelectorAll("p");
    for (const p of paragraphs) {
      const originalText = p.textContent;
      p.textContent = "";
      p.style.visibility = "visible";
      p.style.opacity = 1;
      await typeWriter(p, originalText, 6);
    }
  }

  logTerminal(">>> Residual anomaly successfully contained.", terminal);
}

function scrambleText(el) {
  const original = el.dataset.originalText || el.textContent;
  const chars = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž';
  const originalArr = original.split('');

  const interval = setInterval(() => {
    const scrambled = originalArr.map(char =>
      Math.random() < 0.25 ? chars[Math.floor(Math.random() * chars.length)] : char
    );
    el.textContent = scrambled.join('');
  }, 100);

  el._scrambleInterval = interval;
}

function backspaceErasure(el) {
  return new Promise(resolve => {
    const original = el.textContent;
    let len = original.length;

    const interval = setInterval(() => {
      if (len <= 0) {
        clearInterval(interval);
        el.textContent = "";
        Object.assign(el.style, {
          opacity: "0",
          margin: "0",
          padding: "0",
          height: "0",
          overflow: "hidden"
        });
        resolve();
      } else {
        el.textContent = original.slice(0, --len);
      }
    }, 10);
  });
}

function typeWriter(element, text, delay = 30) {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = "";
    Object.assign(element.style, {
      visibility: "visible",
      opacity: "1",
      margin: "",
      padding: "",
      height: "",
      overflow: ""
    });

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i++);
        setTimeout(type, delay);
      } else {
        resolve();
      }
    }

    type();
  });
}

function autoScroll(id) {
  return new Promise(resolve => {
    const target = document.getElementById(id);
    if (!target) return resolve();

    const topOffset = target.getBoundingClientRect().top + window.pageYOffset;
    const targetPosition = topOffset - (window.innerHeight * 0.2);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Observe until Target
    const check = setInterval(() => {
      const rect = target.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.2 + 2) {
        clearInterval(check);
        resolve();
      }
    }, 50);
  });
}

let scrollLockHandler = null;

function disableScroll() {
  document.body.style.overflow = 'hidden';

  // iOS Safari
  scrollLockHandler = function (e) {
    e.preventDefault();
  };
  document.addEventListener('touchmove', scrollLockHandler, { passive: false });
}

function enableScroll() {
  document.body.style.overflow = '';

  if (scrollLockHandler) {
    document.removeEventListener('touchmove', scrollLockHandler, { passive: false });
    scrollLockHandler = null;
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function logTerminal(line, terminal) {
  if (!terminal) return;

  let last = terminal.lastElementChild;

  if (!last || last.tagName !== "P" || last.classList.contains("static-terminal")) {
    last = document.createElement("p");
    terminal.appendChild(last);
  }

  last.innerHTML += (last.innerHTML ? "<br>" : "") + line;
}

