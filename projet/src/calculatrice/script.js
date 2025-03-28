import { questionnaire } from './questionnaire.js';

// Variables globales
let currentQuestionIndex = 0;
let reponsesString = "";
let correctAnswers = 0;

// Initialisation de la page
document.addEventListener('DOMContentLoaded', function() {
    // Charger la calculatrice
    if (typeof initCalculatrice === 'function') {
        initCalculatrice();
    } else {
        document.getElementById('calculatrice-container').innerHTML = 
            '<div class="alert alert-error">La calculatrice n\'a pas pu être chargée</div>';
    }

    // Afficher la première question
    displayQuestion(currentQuestionIndex);

    // Gestionnaire pour le bouton brute force
    document.getElementById('bruteForceBtn').addEventListener('click', bruteForceAnswers);
});

// Afficher une question
function displayQuestion(index) {
    if (index >= questionnaire.length) {
        checkResponses();
        return;
    }

    const question = questionnaire[index];
    const container = document.getElementById('questionnaire-container');
    
    let html = `
        <div class="mb-8">
            <h4 class="text-xl font-semibold mb-4">${question.qlabel}</h4>
            <div class="flex flex-col gap-2">
    `;

    question.reponses.forEach(response => {
        html += `
            <button class="btn btn-outline response-btn" 
                    data-qid="${question.qid}" 
                    data-rid="${response.rid}"
                    ${response.correct ? 'data-correct="true"' : ''}>
                ${response.rlabel}
            </button>
        `;
    });

    html += `
            </div>
            <div class="mt-4 text-sm opacity-70">
                Question ${index + 1} sur ${questionnaire.length}
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Ajouter les gestionnaires d'événements
    document.querySelectorAll('.response-btn').forEach(btn => {
        btn.addEventListener('click', handleResponse);
    });
}

// Gérer la réponse
function handleResponse(e) {
    const qid = e.target.getAttribute('data-qid');
    const rid = e.target.getAttribute('data-rid');
    const isCorrect = e.target.hasAttribute('data-correct');

    // Mettre à jour la chaîne de réponses
    reponsesString += `A${qid}_${rid}`;

    if (isCorrect) {
        correctAnswers++;
    }

    // Passer à la question suivante
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
}

// Vérifier les réponses et rediriger si nécessaire
function checkResponses() {
    const container = document.getElementById('questionnaire-container');
    const resultMessage = document.getElementById('result-message');
    
    // Vérifier si la page de contact correspondante existe
    const contactPage = `contact_${reponsesString}.html`;
    
    // Dans une vraie application, vous feriez une requête pour vérifier l'existence de la page
    // Pour cet exemple, nous supposons que toutes les bonnes réponses donnent accès
    if (correctAnswers === questionnaire.length) {
        // Créer la page de contact dynamiquement
        createContactPage(contactPage);
        // Rediriger vers la page de contact
        window.location.href = contactPage;
    } else {
        container.innerHTML = `
            <div class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Suite à vos réponses, vous ne souhaitez pas être contacté.</span>
            </div>
            <button class="btn btn-outline mt-4" onclick="location.reload()">Réessayer</button>
        `;
    }
}

// Créer dynamiquement la page de contact
function createContactPage(pageName) {
    // Dans une vraie application, vous pourriez utiliser le localStorage ou un serveur
    // Pour cet exemple, nous allons simplement créer un lien vers une page contact.html standard
    // Note: Cette approche ne fonctionnera pas parfaitement sans un serveur
    
    const contactHTML = `
        <!DOCTYPE html>
        <html lang="fr" data-theme="corporate">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contactez-moi</title>
            <link href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css" rel="stylesheet" type="text/css" />
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="min-h-screen bg-base-100">
            <div class="navbar bg-base-200 shadow-lg">
                <div class="navbar-start">
                    <a href="index.html" class="btn btn-ghost normal-case text-xl">Retour</a>
                </div>
            </div>
            
            <div class="hero min-h-screen bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Contactez-moi!</h1>
                        <p class="py-6">Félicitations pour avoir répondu correctement à toutes les questions. Vous pouvez maintenant me contacter via ce formulaire.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">
                            <form id="contactForm" action="mailto:contact@example.com" method="post" enctype="text/plain">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Nom</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Votre nom" class="input input-bordered" required />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Prénom</span>
                                    </label>
                                    <input type="text" name="firstname" placeholder="Votre prénom" class="input input-bordered" required />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="Votre email" class="input input-bordered" required />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Message</span>
                                    </label>
                                    <textarea name="message" class="textarea textarea-bordered h-24" placeholder="Votre message" required></textarea>
                                </div>
                                <div class="form-control mt-6">
                                    <button type="submit" class="btn btn-primary">Envoyer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Créer un blob et un lien pour télécharger la page (solution de contournement pour cet exemple)
    const blob = new Blob([contactHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Dans une vraie application, vous enverriez cela à un serveur ou utiliseriez une autre méthode
    // Pour cet exemple, nous allons simplement stocker l'URL pour la redirection
    sessionStorage.setItem('contactPageUrl', url);
}

// Fonction brute force pour trouver les bonnes réponses
function bruteForceAnswers() {
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    reponsesString = "";
    correctAnswers = 0;
    
    // Répondre automatiquement à toutes les questions avec les bonnes réponses
    questionnaire.forEach(question => {
        const correctResponse = question.reponses.find(r => r.correct);
        if (correctResponse) {
            reponsesString += `A${question.qid}_${correctResponse.rid}`;
            correctAnswers++;
        }
    });
    
    // Créer et rediriger vers la page de contact
    const contactPage = `contact_${reponsesString}.html`;
    createContactPage(contactPage);
    window.location.href = sessionStorage.getItem('contactPageUrl') || contactPage;
}