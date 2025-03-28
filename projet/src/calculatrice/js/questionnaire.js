// Fichier je.js (questionnaire.js)
export const questionnaire = [
    {
        qlabel: "Quel langage est principalement utilisé pour styliser les pages web?",
        qid: 1,
        reponses: [
            { rlabel: "HTML", rid: 1 },
            { rlabel: "CSS", rid: 2, correct: true },
            { rlabel: "JavaScript", rid: 3 },
            { rlabel: "Python", rid: 4 }
        ]
    },
    {
        qlabel: "Quelle technologie permet de créer des interfaces utilisateur réactives?",
        qid: 2,
        reponses: [
            { rlabel: "jQuery", rid: 1 },
            { rlabel: "React", rid: 2, correct: true },
            { rlabel: "Bootstrap", rid: 3 },
            { rlabel: "Sass", rid: 4 }
        ]
    },
    {
        qlabel: "Quel est le système de contrôle de version le plus utilisé?",
        qid: 3,
        reponses: [
            { rlabel: "Mercurial", rid: 1 },
            { rlabel: "Subversion", rid: 2 },
            { rlabel: "Git", rid: 3, correct: true },
            { rlabel: "CVS", rid: 4 }
        ]
    },
    {
        qlabel: "Quelle méthode permet de développer en itérations courtes?",
        qid: 4,
        reponses: [
            { rlabel: "Waterfall", rid: 1 },
            { rlabel: "Agile", rid: 2, correct: true },
            { rlabel: "Spiral", rid: 3 },
            { rlabel: "V-Model", rid: 4 }
        ]
    }
];