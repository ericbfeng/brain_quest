
// All questionIds should start from 0.
export const satQuestions = [
    {
        type: "SAT",
        subType: "Math",
        questionId: 0,
        question: "What is 1 + 1?",
        answer: "2",
        choices: [
            "1",
            "2",
            "3",
            "4",
        ],
    },
    {
        type: "SAT",
        subType: "Math",
        questionId: 1,
        question: "What is 1 - 1?",
        answer: "0",
        choices: [
            "0",
            "1",
            "2",
            "3",
        ],
    },
    {
        type: "SAT",
        subType: "Science",
        questionId: 2,
        question: "Do dogs have 4 legs?",
        answer: "Yes",
        choices: [
            "Yes",
            "No",
        ],
    },
];

// All questionIds should start from 1000.
export const actQuestions = [
    {
        type: "ACT",
        subType: "Math",
        questionId: 1000,
        question: "What is 1 + 4?",
        answer: "5",
        choices: [
            "2",
            "3",
            "4",
            "5",
        ],
    },
    {
        type: "ACT",
        subType: "Math",
        questionId: 1001,
        question: "What is 1 - 1?",
        answer: "0",
        choices: [
            "0",
            "1",
            "2",
            "3",
        ],
    },
    {
        type: "ACT",
        subType: "English",
        questionId: 1002,
        question: "What is a synonym for happy?",
        answer: "Joyful",
        choices: [
            "Joyful",
            "Sad",
            "Mad",
        ],
    },
];

// All questionIds should start from 2000.
export const apQuestions = [
    {
        type: "AP",
        subType: "Calculus BC",
        questionId: 2000,
        question: "What is 4 + 4?",
        answer: "8",
        choices: [
            "8",
            "7",
            "6",
            "5",
        ],
    },
    {
        type: "AP",
        subType: "Calculus BC",
        questionId: 2001,
        question: "What is 1 * 1?",
        answer: "1",
        choices: [
            "0",
            "1",
            "2",
            "3",
        ],
    },
    {
        type: "AP",
        subType: "World History",
        questionId: 2002,
        question: "When was The Israel Agundis born?",
        answer: "2000",
        choices: [
            "1999",
            "2000",
            "2001",
        ],
    },
];


// All questionIds should start from 3000
export const codingQuestions = [
    {
        type: "CODING",
        subType: "Frontend",
        questionId: 3000,
        question: "Which is a frontend framework?",
        answer: "React",
        choices: [
            "React",
            "Python",
            "SQL",
            "Loops",
        ],
    },
    {
        type: "CODING",
        subType: "Backend",
        questionId: 3001,
        question: "Which language is used to perform queries?",
        answer: "SQL",
        choices: [
            "Java",
            "Python",
            "SQL",
            "C++",
        ],
    },
];

export const allQuestions = [
    ...satQuestions,
    ...actQuestions,
    ...apQuestions,
    ...codingQuestions,
];
