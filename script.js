const questions =[
    {
        question:"Quelle balise HTML est utilisée pour créer un lien hypertexte ?",
        answers:[
            {text: "<link>" , correct:false},
            {text: "<a>" , correct:true},
            {text: "<url>" , correct:false},
            {text: "<hyperlink>" , correct:false},
        ]
    },
    {
        question:"Quelle balise HTML définit un titre de niveau 3 ?",
        answers:[
            {text:"<h6>" , correct:false},
            {text:"<h3>" , correct:true},
            {text:"<titre>" , correct:false},
            {text:"<h1>" , correct:false},
        ]
    },
    {
        question:"Quelle attribut HTML est utilisé pour spécifier l'URL d'une image ?",
        answers:[
            {text: "src" , correct:true},
            {text: "href" , correct:false},
            {text: "alt" , correct:false},
            {text: "title" , correct:false},
        ]
    },
    {
        question:"Quelle propriété CSS est utilisée pour changer la couleur du texte ?",
        answers:[
            {text:"text-style" , correct:false},
            {text:"color" , correct:true},
            {text:"font-color" , correct:false},
            {text:"text-shade" , correct:false},
        ]
    },
    {
        question: "Quelle propriété CSS est utilisée pour créer des ombres portées ?",
        answers: [
          { text: "text-shadow", correct: false },
          { text: "box-shadow", correct: true },
          { text: "drop-shadow", correct: false },
          { text: "shadow", correct: false }
        ]
      },
      {
        question: "Quelle méthode JavaScript permet d'ajouter un élément à la fin d'un tableau ?",
        answers: [
          { text: "push()", correct: true },
          { text: "add()", correct: false },
          { text: "append()", correct: false },
          { text: "insert()", correct: false }
        ]
      },
      {
        question: "Quelle balise HTML est utilisée pour créer une liste non ordonnée ?",
        answers: [
          { text: "<ul>", correct: true },
          { text: "<ol>", correct: false },
          { text: "<list>", correct: false },
          { text: "<menu>", correct: false }
        ]
      },
      {
        question: "Quelle propriété CSS est utilisée pour aligner verticalement le contenu d' un élément ?",
        answers: [
          { text: "vertical-align", correct: true },
          { text: "align-vertical", correct: false },
          { text: "text-align: center", correct: false },
          { text: "align-content", correct: false }
        ]
      },
      {
        question: "Quelle méthode JavaScript permet de sélectionner tous les éléments ayant une classe spécifique ?",
        answers: [
          { text: "getElementsByClassName()", correct: true },
          { text: "querySelectorAll()", correct: false }, // Cette méthode est plus flexible mais ne répond pas exactement à la question
          { text: "getElementByClass()", correct: false },
          { text: "select()", correct: false }
        ]
      },
      {
        question: "Quelle balise HTML est utilisée pour créer un formulaire ?",
        answers: [
          { text: "<form>", correct: true },
          { text: "<input>", correct: false },
          { text: "<application>", correct: false },
          { text: "<data>", correct: false }
        ]
      }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Suivant";
    showQuestion();

}function showQuestion() {
    resetState(); // Réinitialise l'état des réponses
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text; // Affiche le texte de l'option
        button.classList.add("btnq");
        button.dataset.correct = answer.correct; // Définit un attribut pour indiquer si la réponse est correcte
        button.addEventListener("click", selectAnswer); // Ajoute l'écouteur d'événement
        answerButtons.appendChild(button);
    });
    nextButton.style.display = "none"; // Masque le bouton "Suivant" au début
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}function selectAnswer(e) {
    const selectedButton = e.target; // Le bouton sur lequel l'utilisateur a cliqué
    const isCorrect = selectedButton.dataset.correct === "true"; // Vérifie si la réponse est correcte
    if (isCorrect) {
        selectedButton.classList.add("correct"); // Ajoute une classe "correct" pour le style
        score++; // Incrémente le score si la réponse est correcte
    } else {
        selectedButton.classList.add("wrong"); // Ajoute une classe "wrong" pour les mauvaises réponses
    }

    // Désactiver tous les boutons et afficher la bonne réponse
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Style pour la bonne réponse
        }
        button.disabled = true; // Désactive tous les boutons après la sélection
    });

    nextButton.style.display = "block"; // Affiche le bouton "Suivant"
}


function showScore()
{
    resetState();
    questionElement.innerHTML = `Ton score est ${score} sur ${questions.length}!`;
    nextButton.innerHTML="Rejouer";
    nextButton.style.display="block";
    nextButton.addEventListener("click",startQuiz);
}


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});


startQuiz();
