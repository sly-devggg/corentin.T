// Chargement de la calculatrice
function loadCalculatrice() {
    fetch('calculatrice/index.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('calculatrice-container').innerHTML = html;
        // Injecter le CSS de la calculatrice
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'calculatrice/style.css';
        document.head.appendChild(link);
      });
  }
  
  // Chargement du questionnaire
  function loadQuestionnaire() {
    const script = document.createElement('script');
    script.src = 'questionnaire/questions.js';
    script.onload = () => {
      if (typeof initQuestionnaire === 'function') {
        initQuestionnaire();
      }
    };
    document.body.appendChild(script);
  }
  
  // Initialisation
  document.addEventListener('DOMContentLoaded', () => {
    loadCalculatrice();
    loadQuestionnaire();
    
    // Gestionnaire pour le bouton brute force
    document.getElementById('bruteForceBtn')?.addEventListener('click', () => {
      if (typeof bruteForce === 'function') {
        bruteForce();
      }
    });
  });