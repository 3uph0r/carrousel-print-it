// Tableau des diapositives (images et textes)
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

// Sélection des éléments HTML
const imageBanniere = document.querySelector(".banner-img"); // Image du carrousel
const texteBanniere = document.querySelector("#banner p"); // Texte associé à l'image
const conteneurPoints = document.querySelector(".dots"); // Conteneur pour les points
const flecheGauche = document.querySelector(".arrow_left"); // Flèche gauche
const flecheDroite = document.querySelector(".arrow_right"); // Flèche droite

let positionActuelle = 0; // Position actuelle dans le carrousel
let intervalleAutoDefilement; // Pour gérer le défilement automatique

// Crée les points
for (let index = 0; index < slides.length; index++) {
  const point = document.createElement("div"); // Crée un point
  point.classList.add("dot"); // Ajoute la classe pour le style
  if (index === 0) point.classList.add("dot_selected"); // Le premier point est actif
  conteneurPoints.appendChild(point); // Ajoute le point dans le conteneur
}

// Met à jour l'image, le texte, et les points actifs
function mettreAJourCarrousel(position) {
  const points = document.querySelectorAll(".dot");

  // Change l'image et le texte
  imageBanniere.src = `./assets/images/slideshow/${slides[position].image}`;
  texteBanniere.innerHTML = slides[position].tagLine;

  // Met à jour les points
  for (let i = 0; i < points.length; i++) {
    if (i === position) {
      points[i].classList.add("dot_selected");
    } else {
      points[i].classList.remove("dot_selected");
    }
  }
}

// Passe à la diapo précédente
flecheGauche.addEventListener("click", () => {
  positionActuelle--; // Diminue la position
  if (positionActuelle < 0) {
    positionActuelle = slides.length - 1; // Revient à la dernière diapo si négatif
  }
  mettreAJourCarrousel(positionActuelle);
  reinitialiserDefilementAuto();
});

// Passe à la diapo suivante
flecheDroite.addEventListener("click", () => {
  positionActuelle++; // Augmente la position
  if (positionActuelle >= slides.length) {
    positionActuelle = 0; // Revient à la première diapo si dépassement
  }
  mettreAJourCarrousel(positionActuelle);
  reinitialiserDefilementAuto();
});

// Gestion des clics sur les points du carrousel
conteneurPoints.addEventListener("click", (event) => {
  if (event.target.classList.contains("dot")) {
    const points = document.querySelectorAll(".dot"); // Sélectionne tous les points
    for (let i = 0; i < points.length; i++) {
      if (points[i] === event.target) {
        positionActuelle = i; // Trouve l'index du point cliqué
        break; // Une fois trouvé, on quitte la boucle
      }
    }
    mettreAJourCarrousel(positionActuelle); // Met à jour le carrousel
    reinitialiserDefilementAuto(); // Réinitialise le défilement automatique
  }
});

// Lance le défilement automatique
function demarrerDefilementAuto() {
  intervalleAutoDefilement = setInterval(() => {
    positionActuelle++; // Passe à la diapositive suivante
    if (positionActuelle >= slides.length) {
      positionActuelle = 0; // Revient à la première diapositive si dépassement
    }
    mettreAJourCarrousel(positionActuelle);
  }, 3000); // Toutes les 3 secondes
}

// Réinitialise le défilement automatique
function reinitialiserDefilementAuto() {
  clearInterval(intervalleAutoDefilement); // Arrête le défilement actuel
  demarrerDefilementAuto(); // Relance le défilement
}

// Démarrage du carrousel
mettreAJourCarrousel(positionActuelle); // Affiche la première diapositive
demarrerDefilementAuto(); // Lance le défilement automatique
