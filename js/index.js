const tabButtons = document.querySelectorAll(".tab-button");
const mainImages = document.querySelectorAll(".tab-main-image");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tab = button.getAttribute("data-tab");

    tabButtons.forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");

    mainImages.forEach(img => img.classList.add("hidden"));
    document.querySelector(`[data-image="${tab}"]`).classList.remove("hidden");
  });
});