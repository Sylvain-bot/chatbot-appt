import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';
import { tavily } from '@tavily/core';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });

// Charger le contenu de l'inventaire
function getInventoryContent(): string {
  try {
    const filePath = join(process.cwd(), 'app5.txt');
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier inventaire:', error);
    return '';
  }
}

// Fonction pour effectuer une recherche web
async function searchWeb(query: string): Promise<string> {
  try {
    if (!process.env.TAVILY_API_KEY) {
      return '';
    }

    const response = await tavilyClient.search(query, {
      maxResults: 3,
      searchDepth: 'basic',
      includeAnswer: true,
    });

    if (response.answer) {
      return response.answer;
    }

    // Si pas de réponse directe, compiler les résultats
    const results = response.results
      .map((r: any) => `${r.title}: ${r.content}`)
      .join('\n\n');

    return results || '';
  } catch (error) {
    console.error('Erreur lors de la recherche web:', error);
    return '';
  }
}

// Déterminer si une question nécessite une recherche web
function needsWebSearch(question: string): boolean {
  const webSearchKeywords = [
    'cinéma', 'cinema', 'film', 'séance',
    'météo', 'meteo', 'temps', 'température',
    'horaires', 'ouvert', 'fermé', 'heures d\'ouverture',
    'événement', 'evenement', 'spectacle', 'concert',
    'aujourd\'hui', "ce soir", 'demain', 'cette semaine',
    'actualité', 'actualite', 'news', 'info',
    'adresse', 'où se trouve', 'ou se trouve', 'comment aller',
    'itinéraire', 'plan', 'localisation', 'lieu',
    'office du tourisme', 'mairie', 'poste', 'gare',
  ];

  const lowerQuestion = question.toLowerCase();
  return webSearchKeywords.some(keyword => lowerQuestion.includes(keyword));
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages invalides' },
        { status: 400 }
      );
    }

    const inventoryContent = getInventoryContent();

    // Récupérer la dernière question de l'utilisateur
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    let webSearchResults = '';

    // Si la question nécessite une recherche web, effectuer la recherche
    if (lastUserMessage && needsWebSearch(lastUserMessage.content)) {
      const searchQuery = `${lastUserMessage.content} Avranches France`;
      webSearchResults = await searchWeb(searchQuery);
    }

    // Créer un message système avec le contexte de l'appartement
    const systemMessage = {
      role: 'system',
      content: `Tu es un assistant virtuel pour un appartement de location à Avranches. Tu as accès à l'inventaire et aux informations suivantes sur le logement :

${inventoryContent}

${webSearchResults ? `\n=== INFORMATIONS EN TEMPS RÉEL ===\n${webSearchResults}\n` : ''}

Instructions :
- Réponds de manière amicale et professionnelle aux questions des locataires
- Utilise UNIQUEMENT les informations de l'inventaire pour répondre aux questions sur le logement
- Pour les questions sur les environs (cinéma, restaurants, événements, météo, etc.), utilise les informations en temps réel si disponibles
- Si tu ne trouves pas d'information dans l'inventaire pour une question sur le logement, dis-le clairement et suggère de contacter le propriétaire au 0651875143
- Sois concis et précis dans tes réponses
- Réponds en français`,
    };

    // Filtrer pour enlever le message d'accueil initial (assistant)
    const filteredMessages = messages.filter((msg, index) => {
      return msg.role === 'user' || (msg.role === 'assistant' && index > 0);
    });

    // Appeler l'API OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...filteredMessages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0].message;

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre demande', details: error.message },
      { status: 500 }
    );
  }
}
