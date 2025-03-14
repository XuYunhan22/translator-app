export interface Translation {
  id: string;
  originalText: string;
  translatedText: string;
  targetLang: 'en' | 'zh';
  timestamp: string;
  paragraphs?: { original: string; translated: string }[];
} 
