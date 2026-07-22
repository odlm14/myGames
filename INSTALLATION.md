# 📖 Guide d'Installation Complet

## Phase 1: Configuration Firebase (5-10 minutes)

### Étape 1.1: Créer un compte Firebase
- Allez sur [firebase.google.com](https://firebase.google.com)
- Cliquez sur "Commencer"
- Connectez-vous avec un compte Google (créez-en un si nécessaire)

### Étape 1.2: Créer un projet Firebase
1. Cliquez sur "Créer un projet"
2. Remplissez les informations:
   - **Nom du projet**: "Toucher-Couler" (ou ce que tu veux)
   - **ID du projet**: sera générée automatiquement
3. Désactivez "Google Analytics" pour simplifier
4. Cliquez "Créer le projet" et attendez

### Étape 1.3: Créer une Realtime Database
1. Dans la console Firebase (à gauche), cherchez "Realtime Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez:
   - **Région**: `europe-west1` (ou la plus proche)
   - **Mode de sécurité**: "Commencer en mode test"
     - ⚠️ Mode test = données publiques, OK pour dev/test
4. Cliquez "Activer"

### Étape 1.4: Récupérer les clés Firebase
1. Allez dans les **Paramètres du projet** (icône ⚙️ en haut)
2. Onglet **Applications**
3. Cliquez sur l'icône `</>` (Web)
4. Copiez le `firebaseConfig` qui ressemble à:
   ```javascript
   const firebaseConfig = {
       apiKey: "AIza...",
       authDomain: "mon-projet.firebaseapp.com",
       databaseURL: "https://mon-projet.firebaseio.com",
       projectId: "mon-projet",
       storageBucket: "mon-projet.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abc123def456"
   };
   ```

### Étape 1.5: Configurer firebaseConfig.js
1. Ouvrez le fichier `script/firebaseConfig.js`
2. Remplacez **TOUTES** les valeurs `YOUR_...` par celles copiées
3. **Exemple**:
   ```javascript
   const firebaseConfig = {
       apiKey: "AIzaSyBnXXXXXXXXXXXXXXXX",
       authDomain: "mon-jeu-firebase.firebaseapp.com",
       databaseURL: "https://mon-jeu-firebase.firebaseio.com",
       projectId: "mon-jeu-firebase",
       storageBucket: "mon-jeu-firebase.appspot.com",
       messagingSenderId: "123456789012",
       appId: "1:123456789012:web:abcdef0123456789"
   };
   ```
4. Sauvegardez (Ctrl+S)

✅ **Firebase configuré!**

---

## Phase 2: Publication sur GitHub Pages (10-15 minutes)

### Étape 2.1: Créer un compte GitHub
- Allez sur [github.com](https://github.com)
- Cliquez "Sign up"
- Remplissez les informations (nom, email, mot de passe)
- Vérifiez votre email
- Choisissez le plan **Free**

### Étape 2.2: Créer un nouveau repository
1. Cliquez sur le `+` en haut à droite → "New repository"
2. Remplissez:
   - **Repository name**: `toucher-couler` (ou `battleship-game`)
   - **Description**: "Jeu de Toucher-Couler multijoueur en ligne"
   - **Public** ✓ (important pour GitHub Pages)
   - Décochez "Add README" (vous en avez déjà un)
3. Cliquez "Create repository"

### Étape 2.3: Configurer Git localement
Ouvrez un terminal/PowerShell et exécutez:

```bash
# Naviguez vers votre dossier du jeu
cd /home/samgp/repositories/myGames

# Vérifiez que git est initialisé
git status

# Configurez votre identité Git (une seule fois)
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"

# Ajoutez le remote GitHub (remplacez USERNAME et REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Vérifiez que c'est bon
git remote -v
```

**Example réel**:
```bash
cd /home/samgp/repositories/myGames
git remote add origin https://github.com/jean-dupont/toucher-couler.git
```

### Étape 2.4: Premier commit et push
```bash
# Vérifiez les fichiers à committer
git status

# Ajoutez tous les fichiers
git add .

# Créez un commit
git commit -m "Jeu Toucher-Couler v1: Solo + Multijoueur avec Firebase"

# Changez le nom de la branche en 'main'
git branch -M main

# Envoyez vers GitHub
git push -u origin main
```

🎉 **Votre code est sur GitHub!**

### Étape 2.5: Activer GitHub Pages
1. Allez sur votre repository sur GitHub
2. Cliquez sur **Settings** (en haut à droite)
3. À gauche, cliquez sur **Pages**
4. Sous "Build and deployment":
   - **Source**: Sélectionnez "Deploy from a branch"
   - **Branch**: Sélectionnez `main` et `/(root)`
   - Cliquez **Save**
5. Attendez 2-5 minutes
6. Actualisez la page, vous verrez:
   > "Your site is live at: https://USERNAME.github.io/REPO/"

### Étape 2.6: Accédez à votre jeu!
Votre jeu est maintenant en ligne à:
```
https://USERNAME.github.io/toucher-couler
```

**Exemples**:
- https://jean-dupont.github.io/toucher-couler
- https://marie-martin.github.io/battleship-game

---

## Phase 3: Test et utilisation (5 minutes)

### Test en local (avant de publier)
```bash
# Ouvrir un serveur local simple
# Python 3:
python -m http.server 8000

# Puis allez à: http://localhost:8000
```

### Utilisation multijoueur
1. **Joueur 1** ouvre le lien → "Créer une partie" → reçoit un code
2. **Joueur 2** ouvre le même lien → "Rejoindre" → saisi le code
3. Placez les navires et jouez!

---

## ⚠️ Troubleshooting

### "Firebase n'est pas défini"
- ❌ Vérifiez que `firebaseConfig.js` est chargé AVANT `multijoueur.js`
- ✅ Vérifiez que votre `apiKey` est correcte

### "Impossible de rejoindre la partie"
- ❌ Le code expire après 1 heure
- ✅ Recréez une nouvelle partie

### "Le site ne s'ouvre pas"
- ❌ GitHub Pages prend 2-5 minutes pour déployer
- ✅ Attendez, actualisez, puis essayez à nouveau

### Les données ne se synchro pas
- ❌ Vérifiez votre connexion internet
- ✅ Ouvrez la console (F12) et cherchez les erreurs Firebase

---

## 🔐 Sécuriser Firebase pour la production

Actuellement, la base de données est en mode test (données publiques).

Pour la **production**, modifiez les règles:

1. Firebase Console → Realtime Database → **Rules**
2. Remplacez par:
   ```json
   {
     "rules": {
       "games": {
         "$gameId": {
           ".read": true,
           ".write": true
         }
       }
     }
   }
   ```
3. Cliquez **Publier**

---

## 📊 Commandes Git utiles

```bash
# Voir l'état actuel
git status

# Voir l'historique
git log --oneline

# Modifier le dernier commit
git commit --amend

# Annuler le dernier commit
git reset --hard HEAD~1

# Mettre à jour un fichier sur GitHub
git add script/firebaseConfig.js
git commit -m "Update Firebase config"
git push
```

---

## ✅ Checklist finale

- [ ] Compte Firebase créé
- [ ] Realtime Database créée
- [ ] `firebaseConfig.js` rempli avec les clés
- [ ] Compte GitHub créé
- [ ] Repository créé et vide
- [ ] Git configuré localement (`git config`)
- [ ] Premier commit et push effectué
- [ ] GitHub Pages activé
- [ ] Site accessible via HTTPS
- [ ] Jeu solo fonctionne
- [ ] Jeu multijoueur fonctionne

🎮 **Bon jeu!**
