# Guide de Déploiement - Chatbot Appartement

## Étape 1 : Initialiser Git (si pas déjà fait)

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
git init
git add .
git commit -m "Initial commit - Chatbot appartement Rue des Trois Rois"
```

## Étape 2 : Créer un dépôt GitHub

1. Allez sur [GitHub](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite puis **"New repository"**
3. Nommez votre dépôt (par exemple : `chatbot-appartement`)
4. Laissez-le en **Public** ou **Private** (les deux fonctionnent avec Vercel)
5. **NE cochez PAS** "Add a README file" (on en a déjà un)
6. Cliquez sur **"Create repository"**

## Étape 3 : Pousser le code sur GitHub

GitHub vous donnera des commandes. Copiez et exécutez-les dans votre terminal :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/chatbot-appartement.git
git branch -M main
git push -u origin main
```

## Étape 4 : Déployer sur Vercel

### Option A : Via le site web Vercel (RECOMMANDÉ - Plus simple)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Connectez-vous avec votre compte GitHub
4. Cliquez sur **"Add New..."** → **"Project"**
5. Sélectionnez votre dépôt `chatbot-appartement`
6. Cliquez sur **"Import"**
7. **IMPORTANT** : Configurez les variables d'environnement :
   - Cliquez sur **"Environment Variables"**
   - Ajoutez :
     - Name: `OPENAI_API_KEY`
     - Value: `[Votre clé API OpenAI]` (copiez-la depuis votre fichier .env.local)
8. Laissez les autres paramètres par défaut
9. Cliquez sur **"Deploy"**

Vercel va :
- Installer les dépendances
- Construire votre application
- La déployer

**Après 2-3 minutes, vous recevrez une URL** du type : `https://chatbot-appartement.vercel.app`

### Option B : Via la CLI Vercel (Alternative)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivez les instructions et configurez la variable d'environnement OPENAI_API_KEY
```

## Étape 5 : Tester le déploiement

1. Ouvrez l'URL fournie par Vercel dans votre navigateur
2. Testez le chatbot en posant quelques questions
3. Vérifiez que le chatbot répond correctement

## Étape 6 : Générer le QR Code

### Méthode 1 : En ligne (Rapide)

1. Allez sur [qr-code-generator.com](https://www.qr-code-generator.com/) ou [qrcode-monkey.com](https://www.qrcode-monkey.com/)
2. Collez l'URL Vercel de votre chatbot (ex: `https://chatbot-appartement.vercel.app`)
3. Personnalisez le design si vous voulez :
   - Ajoutez un logo (icône de maison 🏠)
   - Choisissez des couleurs (bleu pour correspondre au chatbot)
4. Téléchargez le QR code en **haute résolution** (PNG ou SVG)
5. Imprimez-le et placez-le dans l'appartement

### Méthode 2 : Avec une page dédiée QR Code

Je peux créer une page HTML simple qui génère automatiquement le QR code si vous voulez ?

## Étape 7 : Mettre le QR Code dans l'appartement

**Suggestions d'emplacements :**
- Sur le réfrigérateur (aimanté)
- Sur la table basse dans un petit cadre
- Près de la porte d'entrée
- Dans le livret d'accueil

**Ajoutez un texte explicatif :**
```
🏠 ASSISTANT VIRTUEL
Scannez ce QR code pour accéder
à votre assistant d'appartement 24/7

Questions sur :
• WiFi, chauffage, appareils
• Restaurants et commerces
• Urgences et contacts
```

## Mises à jour futures

Quand vous modifiez le fichier `app5.txt` ou le code :

```bash
git add .
git commit -m "Mise à jour des informations"
git push
```

Vercel redéploiera automatiquement votre site !

## URLs importantes

- **Votre chatbot** : `https://chatbot-appartement.vercel.app` (sera fourni après déploiement)
- **Dashboard Vercel** : https://vercel.com/dashboard
- **GitHub repository** : `https://github.com/VOTRE-USERNAME/chatbot-appartement`

## Dépannage

### Le chatbot ne répond pas
- Vérifiez que la variable d'environnement `OPENAI_API_KEY` est bien configurée dans Vercel
- Allez dans : Vercel Dashboard → Votre projet → Settings → Environment Variables

### Modifier les informations
- Éditez le fichier `app5.txt`
- Poussez sur GitHub
- Vercel redéploiera automatiquement

### Erreur de build
- Vérifiez les logs dans Vercel Dashboard → Deployments
- Contactez-moi si besoin
