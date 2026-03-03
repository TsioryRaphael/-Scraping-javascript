const fs = require("fs");
const path = require("path");

// Charger le JSON
const neqs = JSON.parse(fs.readFileSync("../neq_a_relancer.json", "utf8"));
console.log("Nombre total de NEQ :", neqs.length);

const perFile = Math.ceil(neqs.length / 6); // NEQ par fichier
const perLine = 10;

for (let part = 0; part < 6; part++) {
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

  const fileName = path.join(__dirname, `neqs${part + 1}.js`);
  fs.writeFileSync(fileName, output, "utf8");
  console.log(`✅ Fichier ${fileName} généré avec ${subset.length} NEQ`);
}
