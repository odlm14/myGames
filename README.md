# ⚓ Toucher-Couler Multijoueur

Jeu de Toucher-Couler (Bataille Navale) multijoueur en temps réel. Jouez à 2 sur vos téléphones!

## 🎮 Jeux

- **Solo**: Jouez contre l'ordinateur
- **Multijoueur**: Jouez à 2 avec Firebase Realtime Database

## 🚀 Démarrage rapide

### Prérequis
- Compte Firebase (gratuit)
- Compte GitHub (gratuit)

### Configuration Firebase

1. Allez sur [firebase.google.com](https://firebase.google.com)
2. Créez un projet
3. Créez une Realtime Database
4. Copiez vos clés Firebase
5. Remplissez `script/firebaseConfig.js`:
   ```javascript
   const firebaseConfig = {
       apiKey: "VOS_CLÉS",
       authDomain: "...",
       databaseURL: "...",
       projectId: "...",
       storageBucket: "...",
       messagingSenderId: "...",
       appId: "..."
   };
   ```

### Publication sur GitHub Pages

```bash
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"
git remote set-url origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

Puis allez dans les Settings du repo → Pages → Source: "Deploy from branch" → Branche: `main`

## 📁 Structure

```
├── index.html              # Accueil
├── toucherCouler.html      # Jeu solo
├── multijoueur.html        # Jeu multijoueur
├── script/
│   ├── toucherCouler.js
│   ├── multijoueur.js
│   └── firebaseConfig.js   # ⭐ À configurer!
├── css/
│   ├── toucherCouler.css
│   └── multijoueur.css
└── README.md
```

## 🎯 Comment jouer

**Mode Multijoueur**:
1. Joueur 1: "Créer une partie" → reçoit un code
2. Joueur 2: "Rejoindre" → saisi le code
3. Placez vos navires
4. Jouez!

## 📱 Compatibilité

✅ PC, Mac, Tablette, Téléphone (tous les navigateurs modernes)

## 📄 Licence

Libre d'utilisation et de modification.
