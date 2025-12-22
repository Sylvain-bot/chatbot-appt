# Configuration de Tavily pour la recherche web

## Pourquoi Tavily ?

Tavily est une API de recherche web spécialement conçue pour les chatbots et LLM. Avantages:

- ✅ **1000 recherches GRATUITES par mois**
- ✅ Résultats optimisés pour les IA
- ✅ Réponses rapides et précises
- ✅ Facile à configurer

## Ce que le chatbot peut faire avec la recherche web

Avec Tavily activé, vos locataires pourront demander:

- 🎬 "Qu'est-ce qu'il y a au cinéma ce soir à Avranches?"
- 🌤️ "Quel temps fait-il aujourd'hui?"
- 🍽️ "Quels restaurants sont ouverts ce soir?"
- 🎭 "Y a-t-il des événements cette semaine?"
- ⏰ "Quels sont les horaires de la bibliothèque?"
- 📰 "Quoi de neuf à Avranches?"

## Comment obtenir votre clé API Tavily (5 minutes)

### Étape 1: Créer un compte Tavily

1. Allez sur **https://tavily.com**
2. Cliquez sur **"Get Started"** ou **"Sign Up"**
3. Créez un compte avec votre email
4. Confirmez votre email

### Étape 2: Obtenir votre clé API

1. Connectez-vous sur https://app.tavily.com
2. Allez dans **"API Keys"** dans le menu
3. Cliquez sur **"Create API Key"** ou copiez la clé existante
4. Copiez votre clé API (commence par `tvly-`)

### Étape 3: Ajouter la clé dans votre projet

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Trouvez la ligne `TAVILY_API_KEY=`
3. Collez votre clé après le `=` :
   ```
   TAVILY_API_KEY=tvly-VotreCléIci
   ```
4. Sauvegardez le fichier

### Étape 4: Redémarrer le serveur local

Si vous testez en local:

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

### Étape 5: Configurer sur Vercel

Pour le déploiement en ligne:

1. Allez sur **https://vercel.com/dashboard**
2. Sélectionnez votre projet chatbot
3. Allez dans **Settings** → **Environment Variables**
4. Cliquez sur **"Add New"**
5. Ajoutez:
   - **Name:** `TAVILY_API_KEY`
   - **Value:** `tvly-VotreCléIci`
6. Cliquez sur **"Save"**
7. Allez dans **Deployments** et cliquez **"Redeploy"**

## Tester la recherche web

Une fois configuré, testez avec ces questions:

- "Quel temps fait-il aujourd'hui à Avranches?"
- "Qu'est-ce qu'il y a au cinéma ce soir?"
- "Quels restaurants sont ouverts maintenant?"

Le chatbot devrait vous donner des informations en temps réel!

## Limites et coûts

### Plan gratuit Tavily:
- **1000 recherches/mois** (largement suffisant pour un appartement)
- Au-delà: ~0.01€ par recherche

### Exemple d'utilisation:
- 10 locataires/mois × 5 questions web = **50 recherches/mois**
- Bien en dessous de la limite gratuite!

## Fonctionnement intelligent

Le chatbot est programmé pour:
- ✅ Utiliser l'inventaire (app5.txt) pour les questions sur le logement (GRATUIT)
- ✅ Utiliser Tavily UNIQUEMENT pour les questions sur les environs (événements, météo, etc.)
- ✅ Ne pas gaspiller vos recherches gratuites

## Mots-clés qui déclenchent une recherche web:

- Cinéma, film, séance
- Météo, temps, température
- Horaires, ouvert, fermé
- Événement, spectacle, concert
- Aujourd'hui, ce soir, demain
- Actualité, news

## Si vous ne configurez pas Tavily

Pas de problème! Le chatbot fonctionnera quand même:
- ✅ Répondra à toutes les questions sur le logement (WiFi, chauffage, etc.)
- ✅ Utilisera ses connaissances générales pour les environs
- ❌ Mais ne pourra pas donner d'infos en temps réel (cinéma, météo, événements)

## Support

Besoin d'aide?
- Documentation Tavily: https://docs.tavily.com
- Support Tavily: support@tavily.com

---

**Prêt à activer la recherche web?**
1. Obtenez votre clé sur https://tavily.com
2. Ajoutez-la dans `.env.local` et sur Vercel
3. Testez avec "Quel temps fait-il aujourd'hui?"
