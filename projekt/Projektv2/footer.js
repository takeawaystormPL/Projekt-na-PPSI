const buttons = document.querySelectorAll(".hapla");
const paragraphs = document.querySelectorAll(".bingo");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Ukryj wszystkie paragrafy
    paragraphs.forEach((p) => {
      p.classList.add("bingo");
    });
    if (button.id === "discord") {
      document.getElementById("dc").classList.remove("bingo");
    } else if (button.id === "whatsapp") {
      document.getElementById("what").classList.remove("bingo");
    } else if (button.id === "email") {
      document.getElementById("ema").classList.remove("bingo");
    } else if (button.id === "nrtel") {
      document.getElementById("tal").classList.remove("bingo");
    }
  });
});
