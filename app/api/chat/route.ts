import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Créer un message système avec le contexte de l'appartement
    const systemMessage = {
      role: 'system',
      content: `Tu es un assistant virtuel pour un appartement de location. Tu as accès à l'inventaire et aux informations suivantes sur le logement :

${inventoryContent}

Instructions :
- Réponds de manière amicale et professionnelle aux questions des locataires
- Utilise UNIQUEMENT les informations de l'inventaire pour répondre aux questions sur le logement
- Si une question concerne les environs, les restaurants, les transports ou autres informations locales, tu peux utiliser tes connaissances générales
- Si tu ne trouves pas d'information dans l'inventaire pour une question sur le logement, dis-le clairement et suggère de contacter le propriétaire
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
    console.error('Erreur API OpenAI:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de votre demande', details: error.message },
      { status: 500 }
    );
  }
}
