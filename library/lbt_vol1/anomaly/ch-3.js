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
    rootMargin: "0% 0% -70% 0%"
  });

  document.querySelectorAll(".s-ren").forEach(el => observer.observe(el));
});

function foreignEntity(el) {
  const originalText = el.textContent;

  // Scramble
  obfuscateText(originalText, 100, scrambled => {
    el.textContent = scrambled;
  });
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
