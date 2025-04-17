// tests/login_account_test.js

module.exports = {
  "@tags": ["authentication", "account"],

  "Connexion et accès à la page compte": function (browser) {
    // Variables pour les informations de connexion
    const email = "toast@toast";
    const password = "azerty";

    // URL de base de l'application
    const baseUrl = "http://localhost:5173";

    browser
      // Étape 1: Ouvrir l'application
      .url(baseUrl)
      .waitForElementVisible("body", 1000)
      .assert.titleContains("Bienvenue chez Pizz'a la Carte")

      // Étape 2: Vérifier la présence du bouton de connexion dans la navbar
      .waitForElementVisible("#loginButton", 1000)
      .assert.textContains("#loginButton", "Se connecter / S'inscrire")

      // Étape 3: Cliquer sur le bouton de connexion
      .waitForElementVisible("#loginButton a", 1000)
      .moveToElement("#loginButton", 10, 10)
      .pause(500)
      .url(`${baseUrl}/LoginPage`)
      .pause(1000)

      // Étape 4: Vérifier que nous sommes sur la page de connexion
      .waitForElementVisible(".loginForm", 1000)
      .assert.urlContains("/LoginPage")

      // Étape 5: Remplir le formulaire de connexion
      .waitForElementVisible('input[name="email"]', 1000)
      .clearValue('input[name="email"]')
      .setValue('input[name="email"]', email)
      .clearValue('input[name="password"]')

      // Étape 6: Soumettre le formulaire de connexion
      .setValue('input[name="password"]', [password, browser.Keys.ENTER])
      .pause(1000) // Attendre que la soumission soit traitée

      // Étape 7: Attendre la redirection et vérifier que nous sommes connectés
      // (Vérifier la présence du bouton "Mon compte" dans le header)
      .waitForElementVisible(".myAccount")

      // Étape 8: Accéder à la page du compte
      .moveToElement(".myAccount", 10, 10)
      .pause(2000)
      .url(`${baseUrl}/AccountPage`)
      .pause(2000)

      // Étape 9: Vérifier que nous sommes sur la page du compte
      .waitForElementVisible(".bodyAccount", 3000)
      .assert.urlContains("/AccountPage")
      .assert.textContains(".bodyAccount h1", "Mon compte")

      // Étape 10: Vérifier la présence des informations du compte
      .waitForElementVisible(".inputAccount", 2000)
      .assert.elementPresent(".inputAccount:nth-of-type(1)") // Vérifie que le nom est affiché
      .assert.elementPresent(".inputAccount:nth-of-type(2)") // Vérifie que le prénom est affiché
      .assert.elementPresent(".inputAccount:nth-of-type(3)") // Vérifie que l'email est affiché


      // Etape 11: Présence et clic sur le bouton Deconnexion
      .waitForElementVisible('.buttonOnline a[href="/"]', 3000)
      .assert.textContains('.buttonOnline a[href="/"]', "Deconnexion")
      .click('.buttonOnline a[href="/"]')

      // Étape 12: Vérifier que nous sommes déconnectés (le bouton de connexion est de nouveau visible)
      .waitForElementVisible("#loginButton", 3000)
      .assert.textContains("#loginButton", "Se connecter / S'inscrire");
  },

  // Test de tentative de connexion avec informations invalides
  "Tentative de connexion avec informations invalides": function (browser) {
    const invalidEmail = "invalid@example.com";
    const invalidPassword = "wrongpassword";

    browser
      .waitForElementVisible('#loginButton a')
      .click('#loginButton a')
      .waitForElementVisible(".loginForm", 3000)

      // Remplir le formulaire avec des informations invalides
      .setValue('input[name="email"]', invalidEmail)
      .setValue('input[name="password"]', [invalidPassword, browser.Keys.ENTER])
      .pause(3000)

      // Vérifier l'apparition d'une notification d'erreur (toast)
      .waitForElementVisible(".Toastify__toast--error", 5000)

      // Vérifier que nous restons sur la page de connexion
      .assert.urlContains("/LoginPage")

      .end();
  },

  // Test de sécurité - Tentative d'accès direct à la page compte sans être connecté
  "Tentative d'accès non autorisé à la page compte": function (browser) {
    const baseUrl = "http://localhost:5173";

    browser
      // Essayer d'accéder directement à la page compte sans être connecté
      .url(`${baseUrl}/AccountPage`)
      .pause(2000)

      // Vérifier que nous sommes redirigés vers la page de connexion
      .waitForElementVisible('a[href="/register"]', 1000)
      .assert.textContains('a[href="/register"]', "Pas encore de compte ? Inscrivez vous !")

      .end();
  },
};
