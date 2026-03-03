const fs = require("fs");
const path = require("path");

// Charger le tableau depuis un fichier JavaScript
const inputFile = "./neqs_part3_sliced.js"; // Remplace par le chemin de ton fichier JavaScript
const content = fs.readFileSync(inputFile, "utf8");

// Extraire la partie du tableau
const arrayStart = content.indexOf("[");
const arrayEnd = content.lastIndexOf("]");
const arrayContent = content.substring(arrayStart, arrayEnd + 1);

// Parser le contenu comme JSON (le tableau est valide JSON)
const neqs = JSON.parse(arrayContent);

console.log("Nombre total de NEQ :", neqs.length);

const perFile = Math.ceil(neqs.length / 2); // NEQ par fichier (divisé en 2)
const perLine = 10;

for (let part = 0; part <2 ; part++) {
  const start = part * perFile;
  const end = Math.min(start + perFile, neqs.length);
  const subset = neqs.slice(start, end);

  let output = "let numbers = [\n";

  for (let i = 0; i < subset.length; i++) {
    output += `"${subset[i]}"`;
    if (i < subset.length - 1) output += ",";
    if ((i + 1) % perLine === 0) output += "\n";
    else output += " ";
  }

  output += "\n];\n";

  const fileName = path.join(__dirname, `neqs_test${part + 1}.js`);
  fs.writeFileSync(fileName, output, "utf8");
  console.log(`✅ Fichier ${fileName} généré avec ${subset.length} NEQ`);
}