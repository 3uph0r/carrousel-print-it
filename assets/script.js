const slides = [
  {
    image: "slide1.jpg",
    tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
  },
  {
    image: "slide2.jpg",
    tagLine:
      "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
  },
  {
    image: "slide3.jpg",
    tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
  },
  {
    image: "slide4.png",
    tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
  },
];

// Sélection des éléments
const imageBanniere = document.querySelector(".banner-img");
const texteBanniere = document.querySelector("#banner p");
const conteneurPoints = document.querySelector(".dots");
const flecheGauche = document.querySelector(".arrow_left");
const flecheDroite = document.querySelector(".arrow_right");

let positionActuelle = 0;
let intervalleAutoDefilement;

// Crée les bullet points dynamiquement
slides.forEach((_, index) => {
  const point = document.createElement("div");
  point.classList.add("dot");
  if (index === 0) point.classList.add("dot_selected"); // Le premier point est actif
  conteneurPoints.appendChild(point);
});

// Fonction pour mettre à jour le carrousel
function mettreAJourCarrousel(position) {
  const points = document.querySelectorAll(".dot");

  // Mise à jour de l'image et du texte
  imageBanniere.src = `./assets/images/slideshow/${slides[position].image}`;
  texteBanniere.innerHTML = slides[position].tagLine;

  // Mise à jour des bullet points
  for (let i = 0; i < points.length; i++) {
    if (i === position) {
      points[i].classList.add("dot_selected");
    } else {
      points[i].classList.remove("dot_selected");
    }
  }
}

// Gestion des clics sur les flèches
flecheGauche.addEventListener("click", () => {
  positionActuelle = (positionActuelle - 1 + slides.length) % slides.length;
  mettreAJourCarrousel(positionActuelle);
  reinitialiserDefilementAuto();
  alert("flèche gauche");
});

flecheDroite.addEventListener("click", () => {
  positionActuelle = (positionActuelle + 1) % slides.length;
  mettreAJourCarrousel(positionActuelle);
  reinitialiserDefilementAuto();
  alert("flèche droite");
});

// Gestion des clics sur les bullet points
conteneurPoints.addEventListener("click", (event) => {
  if (event.target.classList.contains("dot")) {
    const points = Array.from(document.querySelectorAll(".dot"));
    positionActuelle = points.indexOf(event.target);
    mettreAJourCarrousel(positionActuelle);
    reinitialiserDefilementAuto();
  }
});

// Fonction pour lancer le défilement automatique
function demarrerDefilementAuto() {
  intervalleAutoDefilement = setInterval(() => {
    positionActuelle = (positionActuelle + 1) % slides.length;
    mettreAJourCarrousel(positionActuelle);
  }, 3000); // Change toutes les 3 secondes
}

// Fonction pour réinitialiser le défilement automatique
function reinitialiserDefilementAuto() {
  clearInterval(intervalleAutoDefilement);
  demarrerDefilementAuto();
}

// Lancement
mettreAJourCarrousel(positionActuelle);
demarrerDefilementAuto();