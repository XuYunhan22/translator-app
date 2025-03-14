import { NextResponse } from 'next/server';
import axios from 'axios';

// 从环境变量获取API密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: '未配置API密钥' },
        { status: 500 }
      );
    }

    // 构建提示词
    const prompt = targetLang === 'en'
      ? `将以下中文文本翻译成英文，保持原文的意思、风格和语气：\n\n${text}`
      : `将以下英文文本翻译成中文，保持原文的意思、风格和语气：\n\n${text}`;

    // 调用Deepseek API
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个专业的翻译助手，擅长中英文互译。请直接提供翻译结果，不要添加任何解释或额外内容。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 4000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );

    const translatedText = response.data.choices[0].message.content.trim();

    // 分段处理
    const paragraphs = [];
    const originalParagraphs = text.split(/\n+/).filter(p => p.trim());
    const translatedParagraphs = translatedText.split(/\n+/).filter(p => p.trim());

    // 如果段落数量匹配，则一一对应
    if (originalParagraphs.length === translatedParagraphs.length) {
      for (let i = 0; i < originalParagraphs.length; i++) {
        paragraphs.push({
          original: originalParagraphs[i],
          translated: translatedParagraphs[i]
        });
      }
    }

    return NextResponse.json({
      translatedText,
      paragraphs
    });
  } catch (error) {
    console.error('翻译API错误:', error);
    return NextResponse.json(
      { error: '翻译服务出错' },
      { status: 500 }
    );
  }
} 
