import puppeteer, { Browser } from 'puppeteer';

(async () => {

const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    headless: false,
});

const page = await browser.newPage();

const linkSelector = 'qc-external-link';
const inputSelector = 'input#Objet';
const checkboxSelector = '#ConditionUtilisationCochee';
const buttonSelector = 'button[type="submit"]'

await page.goto('https://www.quebec.ca/entreprises-et-travailleurs-autonomes/obtenir-renseignements-entreprise/recherche-registre-entreprises/acceder-registre-entreprises');

await page.waitForSelector(linkSelector, { timeout: 5000 });

const newPagePromise = new Promise(resolve => browser.once('targetcreated', target => resolve(target.page())));

await page.click(linkSelector);

await page.goto('https://www.registreentreprises.gouv.qc.ca/reqna/gr/gr03/gr03a71.rechercheregistre.mvc/gr03a71?choixdomaine=RegistreEntreprisesQuebec');

await page.waitForSelector(inputSelector, { timeout: 100000 }); // Wait for input to appear
await page.type(inputSelector, 'groupe humano');


await page.waitForSelector(checkboxSelector, { timeout: 100000 });
await page.click(checkboxSelector);

await page.waitForSelector(buttonSelector, { timeout: 100000 });
await page.click(buttonSelector);

})();