# ⚓ Toucher-Couler Multijoueur

Un jeu de Toucher-Couler (Bataille Navale) multijoueur en temps réel où deux joueurs peuvent jouer sur leurs téléphones respectifs!

## 🎮 Jeux disponibles

- **Toucher-Couler Solo**: `toucherCouler.html` - Jouez contre l'ordinateur
- **Toucher-Couler Multijoueur**: `multijoueur.html` - Jouez à deux en temps réel via Firebase

## 🚀 Installation & Configuration

### Étape 1: Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Cliquez sur "Ajouter un projet"
3. Remplissez les informations du projet
4. Activez Google Analytics (optionnel)
5. Créez le projet

### Étape 2: Configurer Realtime Database

1. Dans la console Firebase, cliquez sur "Realtime Database"
2. Cliquez sur "Créer une base de données"
3. Sélectionnez "Commencer en mode test" (pour les tests)
   - ⚠️ En production, sécurisez avec des règles de sécurité
4. Choisissez la région (ex: "europe-west1")
5. Créez la base de données

### Étape 3: Récupérer les clés Firebase

1. Cliquez sur l'icône ⚙️ > "Paramètres du projet"
2. Allez dans l'onglet "Applications"
3. Cliquez sur l'icône web `</>`
4. Copiez les valeurs dans `firebaseConfig`

### Étape 4: Configurer le fichier firebaseConfig.js

1. Ouvrez `script/firebaseConfig.js`
2. Remplacez les valeurs par les vôtres:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       databaseURL: "https://YOUR_PROJECT.firebaseio.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

### Étape 5: Publier sur GitHub Pages

1. Initialisez git (si ce n'est pas fait):
   ```bash
   git init
   git config user.name "Votre Nom"
   git config user.email "votre.email@example.com"
   ```

2. Créez un repo sur [GitHub](https://github.com/new)
   - Nom recommandé: `battleship-game` ou `toucher-couler`
   - Public (pour GitHub Pages)

3. Connectez votre repo local:
   ```bash
   git remote add origin https://github.com/VOTRE_PSEUDO/VOTRE_REPO.git
   git branch -M main
   git add .
   git commit -m "Initial commit: Toucher-Couler Multijoueur"
   git push -u origin main
   ```

4. Activez GitHub Pages:
   - Allez sur votre repo > Settings > Pages
   - Sélectionnez "Deploy from a branch"
   - Branche: `main`, dossier: `/(root)`
   - Cliquez sur "Save"
   - Attendez quelques minutes, votre site sera disponible à: `https://VOTRE_PSEUDO.github.io/VOTRE_REPO`

## 🎯 Comment jouer au mode multijoueur

1. **Joueur 1**: Clique sur "Créer une partie"
   - Entre ton nom
   - Tu reçois un code (ex: `ABC123`)
   - Partage ce code avec ton ami

2. **Joueur 2**: Clique sur "Rejoindre une partie"
   - Entre ton nom
   - Saisis le code partagé par le Joueur 1
   - Clique "Rejoindre"

3. **Placement des navires**:
   - Les navires se placent automatiquement
   - Clique "Commencer" quand tu es prêt

4. **Jeu**:
   - Alternatif: chaque joueur clique sur les cases de l'adversaire
   - Vert = Manqué (miss)
   - Rouge = Touché (hit)
   - Bordeaux = Coulé (ship sunk)

5. **Victoire**: Le premier à couler tous les navires gagne!

## 📁 Structure du projet

```
myGames/
├── index.html                 # Page d'accueil
├── toucherCouler.html         # Jeu solo
├── multijoueur.html           # Jeu multijoueur
├── css/
│   ├── style.css             # Styles généraux
│   ├── toucherCouler.css     # Styles jeu solo
│   └── multijoueur.css       # Styles multijoueur
└── script/
    ├── toucherCouler.js      # Logique jeu solo
    ├── multijoueur.js        # Logique jeu multijoueur
    └── firebaseConfig.js     # Configuration Firebase (À REMPLIR)
```

## 🔧 Règles de sécurité Firebase (Production)

Pour mettre en production, modifiez les règles dans Firebase Console:

```json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": true,
        "shots": {
          ".validate": "newData.isString()"
        }
      }
    }
  }
}
```

## 🐛 Dépannage

### Le jeu n'se charge pas
- Vérifiez que `firebaseConfig.js` est correctement rempli
- Vérifiez la console du navigateur (F12) pour les erreurs

### Impossible de rejoindre une partie
- Vérifiez que le code est correct (6 caractères)
- Vérifiez que la partie n'a pas expiré
- Vérifiez votre connexion internet

### Les changements ne se synchro pas
- Vérifiez votre connexion Firebase
- Vérifiez les règles de sécurité de Realtime Database

## 📱 Compatible

- ✅ PC / Mac
- ✅ Tablette
- ✅ Téléphone (iOS & Android)
- ✅ Tout navigateur moderne (Chrome, Firefox, Safari, Edge)

## 💡 Améliorations futures

- [ ] Chat entre joueurs
- [ ] Historique des parties
- [ ] Mode solo amélioré
- [ ] Sons et animations
- [ ] Classement en ligne
- [ ] Sélection manuelle des navires

## 📄 Licence

Libre d'utilisation et de modification.

---

**Amusez-vous! 🎮⚓**
