// Wczytywanie komentarzy z pliku
wczytajKomentarze();
// Przycisk dodający komentarz
let submitButton = document.getElementById("submit");
// Formularz
let form = document.querySelector("form");

// Wykona się po kliknięciu przycisku do dodawania komentarza
submitButton.addEventListener("click", function (event) {
  // Dodajemy event jako argument
  // Zapobiegamy domyślnej akcji formularza
  event.preventDefault();
  // Odczytywanie wartości podanych przez użytkownika
  let name = document.getElementById("nick").value;
  let email = document.getElementById("mail").value;
  let com = document.getElementById("com").value;
  stworzKomentarz(name, email, com);
  dodajKomentarzDoPliku(name, email, com);
});

// Przyciski pokazujące paragrafy z danymi kontaktowymi
const contactButtons = document.querySelectorAll(".hapla");
// Paragrafy pojawiające się po naciśnięciu przycisków kontaktowych
const contactDataParagraphs = document.querySelectorAll(".bingo");

contactButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Ukryj wszystkie paragrafy
    contactDataParagraphs.forEach((p) => {
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

// Funkcja tworząca komentarz
function stworzKomentarz(name, email, com) {
  // Sprawdzenie czy wprowadzone dane są poprawne
  if (name == "" || email == "" || com == "") {
    return alert("Wszystkie pola muszą być wypełnione");
  }
  //Kontener na dodane komentarze
  let comments = document.querySelector(".added-comments");
  // Tworzenie komentarza
  let comment = document.createElement("div");
  let nick = document.createElement("h2");
  let mail = document.createElement("h3");
  let text = document.createElement("p");

  // Ustawianie treści komentarza
  nick.textContent = name;
  mail.textContent = email;
  text.textContent = com;

  comment.classList.add("comment");
  comment.appendChild(nick);
  comment.appendChild(mail);
  comment.appendChild(text);
  comments.insertAdjacentElement("afterbegin", comment);
  // Dodawanie do top użytkowników
  let komentarz = document.createElement("li");
  komentarz.textContent = name;

  let commentList = document.querySelector("#kt ul");
  commentList.insertAdjacentElement("afterbegin", komentarz);
  if (commentList.children.length >= 10) {
    commentList.removeChild(commentList.lastElementChild);
  } else {
    commentList.insertAdjacentElement("afterbegin", komentarz);
  }
}
// Funkcja dodająca komentarz do pliku
async function dodajKomentarzDoPliku(name, email, com) {
  // Sprawdzenie czy podane dane są prawidłowe
  if (name.length == 0 || email.length == 0 || com.length == 0) {
    return false;
  }
  // Wykonanie requesta do serwera z prośbą o dodanie komentarza do pliku
  await fetch("http://localhost:3500/dodajKomentarz", {
    method: "POST",
    body: new URLSearchParams({
      nick: name,
      email: email,
      com: com,
    }),
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });
}
// Funkcja wczytująca komentarze
async function wczytajKomentarze() {
  // Request do serwera o wczytanie komentarzy
  const request = await fetch("http://localhost:3500/pobierzKomentarze");
  // Lista komentarzy
  const { komentarze } = await request.json();
  // Sprawdzenie czy jakiekolwiek komentarze istnieją
  if (komentarze.length == 0) {
    return false;
  }
  // Stworzenie divów z komentarzami dla każdego komentarzu z listy
  komentarze.forEach((komentarz) => {
    const { nick, email, com } = komentarz;
    stworzKomentarz(nick, email, com);
  });
}

let ostatniScrollGora = 0;
const nav = document.querySelector("nav");
let wysh = nav.offsetHeight;
window.addEventListener("scroll", function () {
  const biezacyScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (biezacyScroll > ostatniScrollGora) {
    nav.style.top = 0 - wysh + "px";
  } else {
    nav.style.top = "0";
  }

  ostatniScrollGora = biezacyScroll <= 0 ? 0 : biezacyScroll;
});
