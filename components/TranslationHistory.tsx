import { useState } from 'react';
import { FaTrash, FaHistory, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Translation } from './types';

interface TranslationHistoryProps {
  translations: Translation[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const TranslationHistory: React.FC<TranslationHistoryProps> = ({
  translations,
  onSelect,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaHistory className="text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold">翻译历史</h2>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
          {translations.map((translation) => (
            <div
              key={translation.id}
              className="border border-gray-200 rounded-md p-3 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-sm text-gray-500 mr-2">
                      {formatDate(translation.timestamp)}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {translation.targetLang === 'en' ? '中 → 英' : '英 → 中'}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-1">
                    {truncateText(translation.originalText)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {truncateText(translation.translatedText)}
                  </p>
                </div>
                <div className="flex ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(translation.id);
                    }}
                    className="text-blue-600 hover:text-blue-800 px-2 py-1"
                    title="查看翻译"
                  >
                    查看
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(translation.id);
                    }}
                    className="text-red-600 hover:text-red-800 px-2 py-1"
                    title="删除记录"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslationHistory; 