# 📱 Instructions pour générer et utiliser le QR Code

## Étape 1 : Déployer l'application

Suivez les instructions dans le README.md pour déployer sur Vercel.
Une fois déployé, vous obtiendrez une URL comme : `https://chatbot-appartement.vercel.app`

## Étape 2 : Générer le QR Code

### Option A : Utiliser un générateur en ligne (Recommandé)

1. **QR Code Generator** (gratuit, sans inscription)
   - Site : https://www.qr-code-generator.com/
   - Collez votre URL Vercel
   - Choisissez une taille minimum de 3x3 cm pour une bonne lisibilité
   - Téléchargez en haute résolution (PNG ou SVG)

2. **QR Code Monkey** (personnalisation avancée)
   - Site : https://www.qrcode-monkey.com/
   - Permet d'ajouter un logo
   - Personnalisation des couleurs
   - Export en haute qualité

3. **Canva** (design professionnel)
   - Site : https://www.canva.com/
   - Recherchez "QR Code"
   - Créez un design avec contexte (ex: "Scannez pour l'assistant appartement")
   - Ajoutez des instructions visuelles

### Option B : Via un service en ligne de commande

```bash
# Installer qrencode (si vous avez un gestionnaire de paquets)
# Windows (via chocolatey): choco install qrencode
# Mac: brew install qrencode
# Linux: sudo apt-get install qrencode

# Générer le QR code
qrencode -o qrcode.png "https://votre-url.vercel.app"
```

## Étape 3 : Design du QR Code à imprimer

### Template simple (Microsoft Word / PowerPoint)

```
┌─────────────────────────────────────┐
│                                     │
│     🏠 ASSISTANT APPARTEMENT        │
│                                     │
│     [QR CODE ICI - 5x5 cm]         │
│                                     │
│  Scannez pour accéder à             │
│  l'assistant virtuel                │
│                                     │
│  • Inventaire                       │
│  • Informations pratiques           │
│  • Recommandations locales          │
│                                     │
│     WiFi: [Nom réseau]              │
│     Code: [Mot de passe]            │
│                                     │
└─────────────────────────────────────┘
```

### Conseils de design

1. **Taille du QR code** : minimum 3x3 cm pour une lecture facile
2. **Contraste** : QR code noir sur fond blanc (meilleure lecture)
3. **Marge** : laissez 5mm d'espace blanc autour du QR code
4. **Test** : testez toujours avec plusieurs téléphones avant impression

## Étape 4 : Impression et placement

### Matériaux recommandés

1. **Plastifié** (recommandé)
   - Imprimez sur papier photo épais (200g minimum)
   - Plastifiez pour protéger de l'humidité
   - Coût : ~2-5€ dans une imprimerie

2. **Plaque rigide**
   - Impression sur PVC ou aluminium
   - Plus durable, aspect professionnel
   - Coût : ~10-20€

3. **Sticker waterproof**
   - Autocollant résistant à l'eau
   - Facile à coller/décoller
   - Coût : ~5-10€

### Emplacements stratégiques

#### 📍 Emplacement principal (obligatoire)
- **Table d'entrée** ou **console près de la porte**
- Format A5 (148 x 210 mm) avec support
- Visible immédiatement en entrant

#### 📍 Emplacements secondaires (recommandés)
1. **Sur le frigo** (avec aimant) - Format A6
2. **Livret d'accueil** - Format carte de visite
3. **Chambre** (table de chevet) - Format petit
4. **Salle de bain** (waterproof) - Format sticker

### Template d'emplacement complet

```
PORTE D'ENTRÉE
    ↓
[Table/Console]
    ↓
📱 QR CODE (grand format)
+ Instructions

CUISINE
    ↓
[Frigo]
    ↓
🧲 QR CODE (aimant)
+ Contacts urgence
```

## Étape 5 : Instructions pour les locataires

### Texte à afficher avec le QR code

```
📱 ASSISTANT VIRTUEL

1. Ouvrez l'appareil photo de votre téléphone
2. Pointez vers le QR code
3. Cliquez sur la notification qui apparaît
4. Posez vos questions !

Exemples de questions :
• Où sont les oreillers ?
• Comment fonctionne le chauffage ?
• Quels restaurants recommandez-vous ?
• Où est la pharmacie la plus proche ?

Disponible 24h/24 - 7j/7
```

## Étape 6 : Format carte de visite (à distribuer)

Pour inclure dans votre livret d'accueil ou remettre en main propre :

**Dimensions** : 85 x 55 mm (format carte de visite standard)

```
┌─────────────────────────────┐
│  🏠 Votre Assistant         │
│     Rue des Trois Rois      │
│                             │
│   [QR CODE - 3x3cm]         │
│                             │
│  Scannez-moi !              │
│  Questions 24/7             │
└─────────────────────────────┘
```

## Coûts estimés

| Support | Quantité | Coût | Où commander |
|---------|----------|------|--------------|
| Plastifié A5 | 5 | 10€ | Imprimerie locale |
| Sticker waterproof | 10 | 15€ | Vistaprint, Stickermule |
| Plaque PVC | 1 | 20€ | Pixartprinting |
| Cartes visite | 100 | 10€ | Vistaprint, Moo |

## Test avant déploiement

1. ✅ Scannez le QR code avec 3 téléphones différents (iPhone, Android)
2. ✅ Testez depuis le WiFi de l'appartement
3. ✅ Testez avec/sans compte OpenAI actif
4. ✅ Vérifiez que les réponses correspondent au fichier app5.txt
5. ✅ Testez des questions sur les environs

## URLs de services utiles

- **QR Code Generator** : https://www.qr-code-generator.com/
- **QR Code Monkey** : https://www.qrcode-monkey.com/
- **Canva** : https://www.canva.com/
- **Vistaprint** (impression) : https://www.vistaprint.fr/
- **Stickermule** (stickers) : https://www.stickermule.com/

## 🔄 Mise à jour du QR code

**Important** : Si vous changez l'URL Vercel, vous devrez :
1. Régénérer tous les QR codes
2. Réimprimer et remplacer
3. Mettre à jour le livret d'accueil

**Astuce** : Utilisez un domaine personnalisé (ex: assistant.votredomaine.com) pour éviter de changer le QR code si vous changez d'hébergeur.

## Support technique pour les locataires

Ajoutez ces informations près du QR code :

```
❓ Problèmes avec le QR code ?

1. Assurez-vous d'avoir une connexion internet
2. Autorisez l'appareil photo à accéder aux liens
3. Si le code ne fonctionne pas, tapez directement :
   https://votre-url.vercel.app

📞 En cas d'urgence : [votre numéro]
```
