 function waitForElement(selector, callback, maxAttempts = 50, interval = 200) {
        let attempts = 0;
        const intervalId = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(intervalId);
                callback(element);
            } else if (attempts >= maxAttempts) {
                clearInterval(intervalId);
                console.log(`Élément ${selector} non trouvé après ${maxAttempts} tentatives.`);
            }
            attempts++;
        }, interval);
    }
// Fonction pour gérer le widget Turnstile
    function handleTurnstile() {
        waitForElement("#cf-chl-widget-qbquq_response", (tokenInput) => {
            console.log("Input Turnstile trouvé:", tokenInput);
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (tokenInput.value) {
                        console.log("Jeton Turnstile détecté:", tokenInput.value);
                        // Soumettre le formulaire
                        const form = tokenInput.closest("form");
                        if (form) {
                            console.log("Soumission du formulaire Turnstile...");
                            form.submit();
                        }
                    }
                });
            });

            observer.observe(tokenInput, { attributes: true, attributeFilter: ["value"] });

            // Tenter de donner le focus à l'iframe Turnstile
            const iframe = document.querySelector("#cf-chl-widget-qbquq");
            if (iframe) {
                try {
                    iframe.focus();
                    console.log("Focus appliqué sur l'iframe Turnstile.");
                } catch (e) {
                    console.log("Erreur lors de l'interaction avec l'iframe:", e);
                }
            }
        });
    }

    // Quand on est sur la page de vérification Turnstile
    if (document.querySelector("#cf-chl-widget-qbquq")) {
        console.log("Page de vérification Turnstile détectée.");
        handleTurnstile();
        return; // Arrêter ici pour attendre la validation Turnstile
    }

    // Fonction pour gérer le message d'accès refusé
    function handleAccessDenied() {
        const errorMessage = document.querySelector("h2");
        if (errorMessage && errorMessage.innerText.includes("L’accès à notre site Web vous est momentanément refusé")) {
            console.log("Erreur: Accès refusé détecté. Tentative d'actualisation dans 30 secondes...");
            setTimeout(() => {
                console.log("Actualisation de la page...");
                window.location.reload();
            }, 30000); // Attendre 30 secondes avant d'actualiser
            return true; // Indique que l'erreur a été détectée
        }
        return false;
    }

    // Vérifier si la page affiche le message d'accès refusé
    if (handleAccessDenied()) {
        return; // Arrêter l'exécution si l'erreur est détectée
    }