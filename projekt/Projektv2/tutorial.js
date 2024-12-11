const textContentDivs = document.querySelectorAll(".tutorial");
textContentDivs.forEach((div) => {
  const button = div.querySelector("button");
  button.addEventListener("click", (e) => {
    div.classList.add("invisible");
    div.classList.remove("visible");
    console.log(div);
  });
});
const subpageDivs = document.querySelectorAll(".item");
subpageDivs.forEach((div) => {
  div.addEventListener("click", (e) => {
    const id = e.target.id !== "" ? e.target.id : e.target.parentElement.id;
    const elementsToHide = Array.from(textContentDivs).filter(
      (el) => !el.id.includes(id)
    );
    const elementToShow = Array.from(textContentDivs).find((el) =>
      el.id.includes(id)
    );
    console.log(elementsToHide);
    console.log(id);
    elementsToHide.forEach((el) => {
      el.classList.remove("visible");
      el.classList.add("invisible");
    });
    elementToShow.classList.remove("invisible");
    elementToShow.classList.add("visible");
  });
});
