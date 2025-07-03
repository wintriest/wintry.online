document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openDetails");
  const modal = document.getElementById("detailsModal");
  const closeBtn = document.getElementById("closeModal");

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
    });
});
