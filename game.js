let rootNode = {
    question: "Er det en pattedyr?",
    yes: {
        question: "Er det større end en sofa?",
        yes: {
            question: "Er det en elefant?",
            yes: null,
            no: null
        },
        no: {
            question: "Har det en lang hale?",
            yes: {
                question: "Er det en kat?",
                yes: null,
                no: null
            },
            no: {
                question: "Er det en hund?",
                yes: null,
                no: null
            }
        }
    },
    no: {
        question: "Er det en fugl?",
        yes: {
            question: "Kan det svømme?",
            yes: {
                question: "Er det en pingvin?",
                yes: null,
                no: {
                    question: "Er det en and?",
                    yes: null,
                    no: null
                }
            },
            no: {
                question: "Har det farverige fjer?",
                yes: {
                    question: "Er det en papegøje?",
                    yes: null,
                    no: null
                },
                no: {
                    question: "Er det en ørn?",
                    yes: null,
                    no: null
                }
            }
        },
        
        no: {
            question: "Er det en koldblodig?",
            yes: {
                question: "Er det en slange?",
                yes: null,
                no: {
                    question: "Er det en firben?",
                    yes: null,
                    no: null
                }
            },
            no: {
                question: "Er det et insekt?",
                yes: {
                    question: "Har det vinger?",
                    yes: {
                        question: "Er det en sommerfugl?",
                        yes: null,
                        no: null
                    },
                    no: {
                        question: "Er det en myre?",
                        yes: null,
                        no: null
                    }
                },
                no: null
            }
        }
    }
};


let currentNode = rootNode;

function startGame(){
    const start = document.getElementById("startButton");
    if (start.textContent == "Start spil"){
        start.textContent = "Genstart";
        showQuestion();
    }
    else {
        resetGame();
    }
}

function showQuestion() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';

    const questionText = document.createElement('h2');
    questionText.textContent = currentNode.question;
    questionText.className = 'text-lg md:text-xl font-bold text-center text-white py-2';
    gameArea.appendChild(questionText);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-center space-x-4 mt-4';

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Ja';
    yesButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out';
    yesButton.addEventListener('click', () => handleAnswer(true));
    buttonContainer.appendChild(yesButton);

    const noButton = document.createElement('button');
    noButton.textContent = 'Nej';
    noButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'; 
    noButton.addEventListener('click', () => handleAnswer(false));
    buttonContainer.appendChild(noButton);

    gameArea.appendChild(buttonContainer);
}


function handleAnswer(answer) {
    if (answer) {
        if (!currentNode.yes) {
            alert('Jeg har gættet rigtigt!');
            resetGame();
        } else {
            currentNode = currentNode.yes;
            showQuestion();
        }
    } else {
        if (!currentNode.no) {
            alert('Jeg gættede forkert. Lad os lære noget nyt!');
            learnNewAnimal(currentNode);
        } else {
            currentNode = currentNode.no;
            showQuestion();
        }
    }
}


function learnNewAnimal(leafNode) {
    const newAnimal = prompt("Hvad var dyret, du tænkte på?");
    if (newAnimal == null) {
        resetGame();
        return;
    }
    const newQuestion = prompt("Hvad er et spørgsmål, som ville adskille " + newAnimal + " fra " + leafNode.question.slice(10));
    if (newQuestion == null) {
        return;
    }
    dumpTree();

    const newAnswerNode = { question: "Er det en " + newAnimal + "?", yes: null, no: null };

    const oldAnimalNode = { question: leafNode.question, yes: leafNode.yes, no: leafNode.no };

    leafNode.question = newQuestion;
    leafNode.yes = newAnswerNode;
    leafNode.no = oldAnimalNode;

    dumpTree();
    resetGame();
}


function resetGame() {
    currentNode = rootNode;
    showQuestion();
}

function dumpTree() {
    if (rootNode) {
        console.log(JSON.stringify(rootNode, null, 2));
    } else {
        console.log("Træet er tomt eller ikke defineret.");
    }
}
