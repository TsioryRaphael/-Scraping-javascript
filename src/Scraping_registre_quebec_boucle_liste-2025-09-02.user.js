// ==UserScript==
// @name         Scraping registre quebec (boucle liste)
// @namespace    http://tampermonkey.net/
// @version      2025-09-02
// @description  Recherche automatique avec une liste de NEQ
// @match        https://www.registreentreprises.gouv.qc.ca/*
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// ==UserScript==
// @name         Scraping registre quebec multi-NEQ
// @namespace    http://tampermonkey.net/
// @version      2025-09-02
// @description  Scraper plusieurs NEQ automatiquement
// @author       You
// @match        https://www.registreentreprises.gouv.qc.ca/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
    "use strict";

    // Liste de NEQ à traiter

    // Sauvegarde de l’index courant
    let currentIndex = GM_getValue("currentIndex", 0);
    console.log('Premier index:',currentIndex);

    function getContentText() {
        const contentDiv = document.querySelector("#content");
        if (!contentDiv) return "";
        return contentDiv.innerText;
    }

    function downloadContent(content, fileName = "entreprise.txt") {
        const blob = new Blob([content], { type: "text/plain" });
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

            const neq =
                document.querySelector(
                    "ul.kx-synthese li span.kx-display-field"
                )?.innerText;
            downloadContent(contentText, `${neq}.txt`);

            console.log(`✅ Fini pour NEQ ${neq}`);

            // Passer au suivant
            currentIndex++;
            console.log("current index : ",currentIndex);
            console.log('Nombre de neq:' ,numbers.length);
            GM_setValue("currentIndex", currentIndex);

            if (currentIndex > numbers.length)
            {
                console.log("🎉Traitement terminé");
                return;
            }
 window.location.replace("https://www.registreentreprises.gouv.qc.ca/reqna/gr/gr03/gr03a71.rechercheregistre.mvc/gr03a71?choixdomaine=RegistreEntreprisesQuebec");
        }, 500); // délai pour charger la page résultat
    }

    // Fonction pour gérer le message d'accès refusé
    function handleAccessDenied() {
        const errorMessage = document.querySelector("h2");
        if (errorMessage && errorMessage.innerText.includes("L’accès à notre site Web vous est momentanément refusé")) {
            console.log("Erreur: Accès refusé détecté. Tentative d'actualisation dans 30 secondes...");
            setTimeout(() => {
                console.log("Actualisation de la page...");
                window.location.reload();
            }, 1000); // Attendre 30 secondes avant d'actualiser
            return true; // Indique que l'erreur a été détectée
        }
        return false;
    }

    // Vérifier si la page affiche le message d'accès refusé
    if (handleAccessDenied()) {
        return; // Arrêter l'exécution si l'erreur est détectée
    }
    // Quand on est sur la page de recherche
    if (location.href.includes("choixdomaine=RegistreEntreprisesQuebec") || location.href.includes("REQNA/GR/GR03/GR03A71.RechercheRegistre.MVC/GR03A71")) {
        const input = document.querySelector('input[type="text"]');
        const button = document.querySelector('button[type="submit"]');
        const check = document.getElementById("ConditionUtilisationCochee");

        if (
            input &&
            button &&
            check &&
            currentIndex < numbers.length
        ) {
            const neq = numbers[currentIndex];
            input.value = neq;
            check.checked = true;
            button.click();
            console.log(`🔍 Recherche lancée pour ${neq}`);
        }
    }


    // Quand on est sur la fiche entreprise
    setTimeout(() => {
        if (document.querySelector("#content")) {
            processPage();
        }
    }, 1000);
})();

