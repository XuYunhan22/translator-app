import { useState } from 'react';
import { FaExchangeAlt, FaSpinner } from 'react-icons/fa';

interface TranslatorFormProps {
  onTranslate: (text: string, targetLang: 'en' | 'zh') => void;
  isLoading: boolean;
}

const TranslatorForm: React.FC<TranslatorFormProps> = ({ onTranslate, isLoading }) => {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState<'en' | 'zh'>('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onTranslate(text, targetLang);
    }
  };

  const toggleLanguage = () => {
    setTargetLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="text" className="block text-gray-700 font-medium">
            输入需要翻译的文本
          </label>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">
              {targetLang === 'en' ? '中文 → 英文' : '英文 → 中文'}
            </span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100"
              title="切换语言方向"
            >
              <FaExchangeAlt className="text-blue-500" />
            </button>
          </div>
        </div>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder={targetLang === 'en' ? '请输入中文...' : 'Enter English text...'}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <FaSpinner className="animate-spin mr-2" />
              翻译中...
            </span>
          ) : (
            '翻译'
          )}
        </button>
      </div>
    </form>
  );
};

export default TranslatorForm; 