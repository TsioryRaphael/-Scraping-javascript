const fs = require("fs");
const path = require("path");

// Charger le tableau depuis un fichier JavaScript
const inputFile = "./neqs_test.js"; // Chemin du fichier d'entrée
const content = fs.readFileSync(inputFile, "utf8");

// Extraire la partie du tableau
const arrayStart = content.indexOf("[");
const arrayEnd = content.lastIndexOf("]");
const arrayContent = content.substring(arrayStart, arrayEnd + 1);

// Parser le contenu comme JSON (le tableau est valide JSON)
let neqs;
try {
  neqs = JSON.parse(arrayContent);
} catch (error) {
  console.error("Erreur lors du parsing du tableau :", error);
  process.exit(1);
}

console.log("Nombre total de NEQ :", neqs.length);

// Découper le tableau : supprimer les n- premiers éléments
const slicedNeqs = neqs.slice(344390);
console.log("Nombre de NEQ après découpe :", slicedNeqs.length);

// Paramètres pour le formatage
const perLine = 10;

// Générer le contenu du fichier de sortie
let output = "let numbers = [\n";

for (let i = 0; i < slicedNeqs.length; i++) {
  output += `"${slicedNeqs[i]}"`;
  if (i < slicedNeqs.length - 1) output += ",";
  if ((i + 1) % perLine === 0) output += "\n";
  else output += " ";
}

output += "\n];\n";

// Écrire dans un nouveau fichier
const outputFile = path.join(__dirname, "neqs_part3_sliced.js");
fs.writeFileSync(outputFile, output, "utf8");
console.log(`✅ Fichier ${outputFile} généré avec ${slicedNeqs.length} NEQ`);