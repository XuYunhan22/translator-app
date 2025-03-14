'use client';

import { useState, useEffect } from 'react';
import TranslatorForm from '../components/TranslatorForm';
import TranslationResult from '../components/TranslationResult';
import TranslationHistory from '../components/TranslationHistory';
import { Translation } from '../components/types';

export default function Home() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<Translation | null>(null);

  // 从本地存储加载翻译历史
  useEffect(() => {
    const savedTranslations = localStorage.getItem('translations');
    if (savedTranslations) {
      setTranslations(JSON.parse(savedTranslations));
    }
  }, []);

  // 保存翻译历史到本地存储
  useEffect(() => {
    if (translations.length > 0) {
      localStorage.setItem('translations', JSON.stringify(translations));
    }
  }, [translations]);

  const handleTranslate = async (text: string, targetLang: 'en' | 'zh') => {
    setLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, targetLang }),
      });

      if (!response.ok) {
        throw new Error('翻译请求失败');
      }

      const data = await response.json();
      
      const newTranslation: Translation = {
        id: Date.now().toString(),
        originalText: text,
        translatedText: data.translatedText,
        targetLang,
        timestamp: new Date().toISOString(),
        paragraphs: data.paragraphs || [],
      };

      setCurrentTranslation(newTranslation);
      setTranslations(prev => [newTranslation, ...prev].slice(0, 50)); // 只保留最近的50条记录
    } catch (error) {
      console.error('翻译出错:', error);
      alert('翻译失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (id: string) => {
    const selected = translations.find(t => t.id === id);
    if (selected) {
      setCurrentTranslation(selected);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setTranslations(prev => prev.filter(t => t.id !== id));
    if (currentTranslation?.id === id) {
      setCurrentTranslation(null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">中英文互译</h1>
        <p className="text-gray-600">使用AI进行中英文互译</p>
      </header>

      <TranslatorForm onTranslate={handleTranslate} isLoading={loading} />

      {currentTranslation && (
        <TranslationResult translation={currentTranslation} />
      )}

      {translations.length > 0 && (
        <TranslationHistory 
          translations={translations} 
          onSelect={handleSelectHistory}
          onDelete={handleDeleteHistory}
        />
      )}
    </div>
  );
} 