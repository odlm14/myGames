# 🚀 Prochaines étapes pour publier votre jeu

Félicitations! 🎉 J'ai créé un jeu de **Toucher-Couler multijoueur complet** avec:
- ✅ Jeu solo contre l'IA
- ✅ Mode multijoueur temps réel (2 joueurs)
- ✅ Synchronisation Firebase
- ✅ Hébergement GitHub Pages

---

## 📋 À faire maintenant

### **Étape 1: Configuration Firebase** (10 min)
1. Allez sur https://firebase.google.com
2. Créez un projet Firebase gratuit
3. Créez une Realtime Database
4. Copiez vos clés Firebase
5. Ouvrez `script/firebaseConfig.js`
6. Remplacez les valeurs `YOUR_...` par vos clés

👉 **Voir le guide complet**: [INSTALLATION.md](INSTALLATION.md)

### **Étape 2: Créer un compte GitHub** (5 min)
1. Allez sur https://github.com
2. Créez un compte gratuit
3. Notez votre username (ex: "jean-dupont")

### **Étape 3: Créer un repository** (5 min)
1. Sur GitHub, cliquez `+` → "New repository"
2. Nom: `toucher-couler` (ou autre)
3. **Public** (important!)
4. Créez le repo (sans README)

### **Étape 4: Publier le code** (5 min)
Ouvrez un terminal et exécutez:

```bash
cd /home/samgp/repositories/myGames

# Configurez Git (une seule fois)
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"

# Remplacez USERNAME et REPO par vos valeurs
git remote set-url origin https://github.com/USERNAME/REPO.git

# Envoyez le code
git branch -M main
git push -u origin main
```

**Exemple réel**:
```bash
git remote set-url origin https://github.com/jean-dupont/toucher-couler.git
git branch -M main
git push -u origin main
```

### **Étape 5: Activer GitHub Pages** (5 min)
1. Sur votre repository GitHub
2. **Settings** (en haut) → **Pages** (à gauche)
3. Source: "Deploy from a branch"
4. Branch: `main` / `/(root)`
5. Cliquez **Save**
6. Attendez 2-5 minutes

✅ **Votre site sera à**: `https://USERNAME.github.io/REPO/`

---

## 🎮 Comment utiliser

### Mode Solo
```
https://USERNAME.github.io/REPO/toucherCouler.html
```

### Mode Multijoueur
```
https://USERNAME.github.io/REPO/multijoueur.html
```

1. Joueur 1: "Créer une partie" → reçoit un code (ex: ABC123)
2. Joueur 2: "Rejoindre" → tape le code
3. Placez les navires
4. Jouez!

---

## 📁 Fichiers créés

```
myGames/
├── index.html                 # Page d'accueil
├── toucherCouler.html         # Jeu solo
├── multijoueur.html           # Jeu multijoueur ⭐ (À configurer Firebase!)
├── INSTALLATION.md            # Guide détaillé
├── README_MULTIJOUEUR.md      # Documentation du jeu
├── SETUP_GUIDE.md             # Ce fichier
├── .gitignore                 # Fichiers à ignorer
├── css/
│   ├── style.css
│   ├── toucherCouler.css
│   └── multijoueur.css
└── script/
    ├── toucherCouler.js
    ├── multijoueur.js
    └── firebaseConfig.js      # ⭐ À REMPLIR AVEC VOS CLÉS!
```

---

## ⚠️ Point crucial: firebaseConfig.js

**AVANT de publier sur GitHub**, vous DEVEZ:

1. ✅ Créer un projet Firebase
2. ✅ Créer une Realtime Database
3. ✅ Récupérer vos clés Firebase
4. ✅ Modifier `script/firebaseConfig.js`
5. ✅ Tester en local

**Sinon le jeu multijoueur ne fonctionnera pas!**

---

## 🧪 Test local avant de publier

```bash
cd /home/samgp/repositories/myGames

# Python 3 (recommended)
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (si vous l'avez)
npx http-server
```

Puis allez à: **http://localhost:8000**

---

## ✅ Checklist avant publication

- [ ] Compte Firebase créé
- [ ] Realtime Database créée
- [ ] `firebaseConfig.js` rempli
- [ ] Jeu solo testé en local
- [ ] Jeu multijoueur testé en local
- [ ] Compte GitHub créé
- [ ] Repository créé et configuré
- [ ] Code pushé sur GitHub
- [ ] GitHub Pages activé
- [ ] Site en ligne et fonctionnel

---

## 🆘 Besoin d'aide?

Consultez:
- [INSTALLATION.md](INSTALLATION.md) - Guide détaillé
- [README_MULTIJOUEUR.md](README_MULTIJOUEUR.md) - Règles & FAQ

---

## 🎯 Les 3 commandes essentielles

```bash
# 1. Voir le statut
git status

# 2. Ajouter et committer
git add .
git commit -m "Message descriptif"

# 3. Envoyer sur GitHub
git push
```

---

**Vous êtes prêt(e)! Bonne chance! 🚀⚓**
