import { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { Translation } from './types';

interface TranslationResultProps {
  translation: Translation;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ translation }) => {
  const [displayMode, setDisplayMode] = useState<'full' | 'parallel'>('full');

  const speakText = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'zh-CN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">翻译结果</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setDisplayMode('full')}
            className={`px-3 py-1 rounded ${
              displayMode === 'full' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            整体显示
          </button>
          <button
            onClick={() => setDisplayMode('parallel')}
            className={`px-3 py-1 rounded ${
              displayMode === 'parallel' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            段落对照
          </button>
        </div>
      </div>

      {displayMode === 'full' ? (
        <div className="relative p-4 bg-gray-50 rounded-md">
          <button
            onClick={() => speakText(translation.translatedText, translation.targetLang)}
            className="absolute top-2 right-2 p-2 text-blue-600 hover:text-blue-800"
            title="朗读翻译"
          >
            <FaVolumeUp />
          </button>
          <p className="whitespace-pre-line">{translation.translatedText}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {translation.paragraphs && translation.paragraphs.length > 0 ? (
            translation.paragraphs.map((para, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <div className="p-3 bg-gray-100 rounded-t-md relative">
                  <button
                    onClick={() => speakText(para.original, translation.targetLang === 'en' ? 'zh' : 'en')}
                    className="absolute top-2 right-2 p-1 text-blue-600 hover:text-blue-800"
                    title="朗读原文"
                  >
                    <FaVolumeUp />
                  </button>
                  <p className="whitespace-pre-line">{para.original}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-b-md relative">
                  <button
                    onClick={() => speakText(para.translated, translation.targetLang)}
                    className="absolute top-2 right-2 p-1 text-blue-600 hover:text-blue-800"
                    title="朗读翻译"
                  >
                    <FaVolumeUp />
                  </button>
                  <p className="whitespace-pre-line">{para.translated}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="border-b pb-3">
              <div className="p-3 bg-gray-100 rounded-t-md relative">
                <button
                  onClick={() => speakText(translation.originalText, translation.targetLang === 'en' ? 'zh' : 'en')}
                  className="absolute top-2 right-2 p-1 text-blue-600 hover:text-blue-800"
                  title="朗读原文"
                >
                  <FaVolumeUp />
                </button>
                <p className="whitespace-pre-line">{translation.originalText}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-b-md relative">
                <button
                  onClick={() => speakText(translation.translatedText, translation.targetLang)}
                  className="absolute top-2 right-2 p-1 text-blue-600 hover:text-blue-800"
                  title="朗读翻译"
                >
                  <FaVolumeUp />
                </button>
                <p className="whitespace-pre-line">{translation.translatedText}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslationResult; 