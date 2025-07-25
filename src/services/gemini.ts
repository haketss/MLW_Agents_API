import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,

})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'Transcreva o áudio para português do Brasil. Seja preciso e natual na transcrição. mantenha a pontuação  adequada e divida o texto em paragrafos quando for apropriado.'
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64,
                }
            }
        ]
    })


    if (!response.text) {
        throw new Error('Não foi possivel converter o áudio')
    }

    return response.text
}

export async function generateEmbeddings(text: string) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{ text }],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT',
        }
    })

    if (!response.embeddings?.[0].values) {
        throw new Error('não foi possível gerar os embeddings.')
    }

    return response.embeddings[0].values
}

export async function generateAnswer(question: string, transcriptions: string[]) {
    const context = transcriptions.join('\n\n')

    const prompt = `
    com base no texto fornecido a baixo com comtexto, responda a pergunta de forma clara e precisa e em portugues do brasil 

    CONTEXTO: 
    ${context}

    PERGUNTA: 
    ${question}

    INSTULÇÔES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que mão possui informações sufuciente para responder; 
    - Seja objetivo;
    - Mantenha um tom educatrivo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - se for citar o contexto, utilize o termo "conteúdo da aula";
    
    `.trim()

    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt
            }
        ]
    })

    if (!response.text) {
        throw new Error('Falha ao gerar resposta pelo Gemini')
    }
    return response.text
}