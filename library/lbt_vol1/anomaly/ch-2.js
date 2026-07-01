document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("point");
  const target = document.getElementById("replace");

  if (!trigger || !target) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.disconnect();

        // Replace the span's content
        target.textContent = "07:30.57";
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: "0% 0% -20% 0%"
  });

  observer.observe(trigger);
});