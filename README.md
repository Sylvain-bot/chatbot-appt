# 🏠 Chatbot Appartement - Rue des Trois Rois

Un chatbot intelligent pour assister vos locataires 24/7, accessible via QR code.

## ✨ Fonctionnalités

- 💬 Chatbot intelligent basé sur **OpenAI GPT-4o-mini**
- 📋 Accès à l'inventaire et aux informations de l'appartement
- 🌍 Réponses sur les environs (restaurants, transports, attractions)
- 📱 Interface mobile-friendly optimisée
- 🔗 Accessible via QR code
- 💰 Très économique (~0.001€ par conversation)

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
OPENAI_API_KEY=votre_cle_api_openai
```

**Pour obtenir une clé API OpenAI :**

1. Allez sur https://platform.openai.com/api-keys
2. Créez un compte ou connectez-vous
3. Cliquez sur "Create new secret key"
4. Copiez la clé et collez-la dans le fichier `.env.local`

**Avantages de GPT-4o-mini :**
- ✅ Très économique (~0.001€ par conversation)
- ✅ Réponses rapides et précises
- ✅ Idéal pour un chatbot d'appartement
- ✅ Coût mensuel estimé : < 5€

### 3. Personnaliser l'inventaire

Le fichier `app5.txt` contient déjà toutes les informations de votre appartement.
Vous pouvez le modifier à tout moment pour mettre à jour les informations.

## 💻 Développement local

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Déploiement sur Vercel

### 📖 Guide complet : [DEPLOIEMENT.md](DEPLOIEMENT.md)

**Résumé rapide :**

1. **Créer un dépôt GitHub** :
   ```bash
   # Le dépôt Git est déjà initialisé !
   git remote add origin https://github.com/VOTRE-USERNAME/chatbot-appartement.git
   git branch -M main
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Déployer sur Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub
   - Cliquez sur "Add New Project"
   - Sélectionnez votre dépôt
   - Ajoutez la variable : `OPENAI_API_KEY`
   - Cliquez sur "Deploy"

3. **Générer le QR Code** :
   - Accédez à `https://votre-url.vercel.app/qr-instructions.html`
   - Téléchargez le QR code
   - Imprimez et placez-le dans l'appartement


## 📝 Personnalisation

### Modifier les questions rapides

Éditez le tableau `quickQuestions` dans [app/page.tsx](app/page.tsx) :

```typescript
const quickQuestions = [
  'Où sont les oreillers ?',
  'Comment fonctionne le chauffage ?',
  // Ajoutez vos questions ici
];
```

### Modifier le style

Les couleurs peuvent être changées dans [app/globals.css](app/globals.css) :

```css
:root {
  --primary-color: #2563eb;  /* Bleu */
  --secondary-color: #1e40af;
  /* ... */
}
```


## 🔧 Maintenance

### Mettre à jour l'inventaire

1. Modifiez le fichier `app5.txt`
2. Committez et poussez les changements
3. Vercel redéploiera automatiquement

### Surveiller l'utilisation de l'API

- Consultez votre usage sur https://platform.openai.com/usage
- GPT-4o-mini est très économique (~0.001€ par conversation)
- Coût mensuel estimé pour un appartement : < 5€

## 📊 Structure du projet

```
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # API du chatbot (OpenAI)
│   ├── page.tsx               # Interface utilisateur
│   ├── layout.tsx             # Layout principal
│   └── globals.css            # Styles globaux
├── public/
│   └── qr-instructions.html   # Générateur de QR code
├── app5.txt                   # Inventaire de l'appartement
├── DEPLOIEMENT.md             # Guide de déploiement
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## 💰 Coûts

| Service | Coût |
|---------|------|
| **API OpenAI (GPT-4o-mini)** | ~0.001€/conversation |
| **Hébergement Vercel** | **GRATUIT** ✅ |
| **Impression QR Code** | 10-20€ (une fois) |

**Total mensuel estimé : < 5€** 💰

## 🆘 Support

Pour toute question ou problème :
1. Vérifiez que votre clé OpenAI est valide sur https://platform.openai.com/api-keys
2. Consultez les logs Vercel en cas d'erreur
3. Vérifiez que le fichier `app5.txt` est bien présent
4. Consultez le guide [DEPLOIEMENT.md](DEPLOIEMENT.md)

## 📄 Licence

Projet personnel - Libre d'utilisation et de modification
