// ==UserScript==
// @name         Auto Search and Copy EBAX
// @namespace    http://tampermonkey.net/

     function getContentText() {
        const contentDiv = document.querySelector("#content");
        if (!contentDiv) return '';
        return contentDiv.innerText; // texte visible
    }

     function downloadContent(content, fileName="entreprise.txt") {
        const blob = new Blob([content], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    }

     function processPage() {

        setTimeout(() => { 
            const contentText = getContentText();
            GM_setClipboard(contentText); // Copier dans le presse-papiers
            console.log("Contenu copié !");

            // Télécharger automatiquement (optionnel)
            const neq = document.querySelector("ul.kx-synthese li span.kx-display-field")?.innerText ;
            downloadContent(contentText, `${neq}.txt`);
        }, 10000); // 1s de délai pour que tout se charge
    }



  const timeout = setTimeout(() => {
    
        const input = document.querySelector('input[type="text"]');
        const button = document.querySelector('button[type="submit"]');
        const check = document.getElementById('ConditionUtilisationCochee');

        if(input && button && check ) {
            input.value = "groupe humano"; // Remplacer par la recherche souhaitée
            check.checked = true;
            button.click();
            console.log("Recherche lancée automatiquement !");
        }
},10000);

    const secondTimeout = setTimeout(() => {
        if (document.querySelector("#kx-datalist-container3 #entreprise form button")) {
            const buttons = document.querySelectorAll("#kx-datalist-container3 #entreprise form button");
            console.log("buttons", buttons);
            buttons[0].click();}
        }, 10000);

    
    const thirdTimeout = setTimeout(() => {
     if (document.querySelector("#content")) {
        processPage();
    }
},10000);
