document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        screenTear(el);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0% 0% -50% 0%"
  });

  document.querySelectorAll(".disruption").forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        foreignEntity(el);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0% 0% -85% 0%"
  });

  document.querySelectorAll(".s-ren").forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        foreignDialogue(el);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0% 0% -85% 0%"
  });

  document.querySelectorAll(".ds-ren").forEach(el => observer.observe(el));
});


function screenTear(el) {
  const glitchOverlay = document.getElementById("glitch-overlay");

  if (glitchOverlay) {
    const flickers = [200, 600, 1000];
    glitchOverlay.classList.add("rgb-glitch");

    flickers.forEach((t, i) => {
      setTimeout(() => glitchOverlay.classList.remove("rgb-glitch"), t);
      setTimeout(() => glitchOverlay.classList.add("rgb-glitch"), t + 100);
    });

    setTimeout(() => glitchOverlay.classList.remove("rgb-glitch"), 1600);
  }
}

function foreignEntity(el) {
  const originalText = el.textContent;

  // Scramble
  obfuscateText(originalText, 100, scrambled => {
    el.textContent = scrambled;
  });
}

function foreignDialogue(el) {
  const originalText = el.textContent;

  // Scramble
  obfuscateDialogue(originalText, 10, 80, scrambled => {
    el.textContent = scrambled;
  });
}

function obfuscateDialogue(text, cycles = 10, interval = 80, callback) {
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

function obfuscateText(text, interval = 100, callback) {
  const chars = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž';
  const original = text.split('');

  const scrambleInterval = setInterval(() => {
    const scrambled = original.map((char, i) =>
      Math.random() < 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char
    );

    callback(scrambled.join(''));
  }, interval);
}
