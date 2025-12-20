import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapResponse } from "../types";

// APIキーがない場合でもアプリが起動できるように、遅延初期化
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    // 環境変数からAPIキーを取得（文字列として確実に扱う）
    const apiKeyRaw = process.env.API_KEY || process.env.GEMINI_API_KEY;
    let apiKey = typeof apiKeyRaw === 'string' ? apiKeyRaw : String(apiKeyRaw || '');
    
    // 改行文字や余分な文字を削除
    apiKey = apiKey.trim().replace(/\n/g, '').replace(/^y\n?/i, '').replace(/\n?$/g, '');
    
    // AIzaSyで始まる部分だけを抽出（APIキーの正しい形式）
    const match = apiKey.match(/AIzaSy[A-Za-z0-9_-]+/);
    if (match) {
      apiKey = match[0];
    }
    
    console.log('API Key check:', { 
      hasApiKey: !!apiKey && apiKey !== '', 
      keyLength: apiKey.length,
      keyPrefix: apiKey.substring(0, 10),
      keyType: typeof apiKeyRaw
    });
    
    if (!apiKey || apiKey === '' || apiKey === 'undefined' || apiKey === 'null' || !apiKey.startsWith('AIzaSy')) {
      throw new Error("GEMINI_API_KEY環境変数が正しく設定されていません。Vercelダッシュボードで設定してください。");
    }
    
    // APIキーを文字列として確実に渡す
    ai = new GoogleGenAI({ apiKey: apiKey });
  }
  return ai;
};

export const generateSampleRoadmap = async (worry: string): Promise<RoadmapResponse> => {
  try {
    const aiInstance = getAI();
    const response = await aiInstance.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `ユーザーの悩み: ${worry}`,
      config: {
        systemInstruction: `
          あなたは大阪府議会議員であり、人々の挑戦を後押しするリーダー、「前田将臣（まえだ まさおみ）」です。
          ユーザーの悩みに対して、解決への道筋（ロードマップ）を提示してください。
          
          ポリシー:
          - 「創造し、挑戦する」ことを重視する。
          - 「今この瞬間」に行動することを促す。
          - 政治家としての広い視野を持ちつつ、庶民の目線に立って親身にアドバイスする。
          - 抽象論で終わらせず、具体的な行動（アクション）を提示する。
          
          ターゲット: 30-40代のビジネスパーソンや、現状を変えたいと願う市民。
          トーン: 熱意があり、頼りがいがあり、かつ親しみやすい。
          
          以下のJSON形式で出力してください。
          stepsは必ず3つ提案してください。
          summaryはユーザーへの共感と、「ともに未来を変えましょう」といった力強い励ましを1文で。
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  actionItem: { type: Type.STRING },
                },
                required: ["title", "description", "actionItem"],
              },
            },
          },
          required: ["summary", "steps"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }
    return JSON.parse(text) as RoadmapResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};