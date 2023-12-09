// Contenido de script.js
import { preguntasModulo1 } from './preguntas.js';

const modules = {
  modulo1: {
    name: "Fundamentos y Marco Legal de la Prevención de Riesgos Laborales",
    topics: preguntasModulo1,
  },
  // Agrega más módulos según sea necesario
};

document.addEventListener("DOMContentLoaded", () => {
  const moduleList = document.getElementById("module-list");
  const contentDiv = document.getElementById("content");

  // Load modules into the module list
  for (const moduleName in modules) {
    const moduleListItem = document.createElement("li");
    moduleListItem.className = "module-list-item";
    moduleListItem.textContent = modules[moduleName].name;
    moduleListItem.addEventListener("click", () => loadModule(moduleName));
    moduleList.appendChild(moduleListItem);
  }
});

function loadModule(moduleName) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  const moduleDiv = document.createElement("div");
  moduleDiv.innerHTML = `<h2>${modules[moduleName].name}</h2>`;

  // Get all questions of the module
  const allQuestions = Object.values(modules[moduleName].topics)
    .map((topic) => topic.questions)
    .flat();

  // Select 50 questions randomly
  const selectedQuestions = getRandomQuestions(allQuestions, 50);

  // Add buttons for each topic of the module
  for (const topicKey in modules[moduleName].topics) {
    const topic = modules[moduleName].topics[topicKey];
    const topicButton = createButton(topic.name, () => startTopicQuiz(moduleName, topicKey));
    moduleDiv.appendChild(topicButton);
  }

  // Add the button for the module quiz
  const moduleQuizButton = createButton("Cuestionario del Módulo", () => startModuleQuiz(moduleName, selectedQuestions));
  moduleDiv.appendChild(moduleQuizButton);

  contentDiv.appendChild(moduleDiv);
}

// Other functions (getRandomQuestions, shuffleArray, startTopicQuiz, startModuleQuiz) remain unchanged

function createButton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}
