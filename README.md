# 中英文互译应用

这是一个简单的中英文互译应用，使用Deepseek API提供翻译功能。

## 功能特点

- 中英文双向翻译
- 段落对照显示
- 文本朗读功能
- 翻译历史记录
- 完全在浏览器中运行，无需后端服务器

## 使用方法

### 在线使用

1. 访问 https://xuyunhan.gitee.io/translator-app/
2. 输入需要翻译的文本
3. 输入您的Deepseek API密钥（可以从 https://platform.deepseek.com 获取）
4. 点击"翻译"按钮

### 本地使用

1. 下载 `index.html` 文件
2. 在浏览器中打开该文件
3. 输入需要翻译的文本
4. 输入您的Deepseek API密钥
5. 点击"翻译"按钮

## 获取Deepseek API密钥

1. 访问 https://platform.deepseek.com
2. 注册并登录账号
3. 在个人设置中找到API密钥选项
4. 创建新的API密钥
5. 复制API密钥并在应用中使用

## 隐私说明

- 所有翻译操作直接通过您的浏览器调用Deepseek API
- 翻译历史保存在您的浏览器本地存储中，不会上传到任何服务器
- API密钥仅用于调用翻译服务，不会被保存

## 技术说明

- 使用HTML, CSS和JavaScript开发
- 使用TailwindCSS进行样式设计
- 使用浏览器的Web Speech API实现文本朗读功能
- 使用localStorage保存翻译历史

## 联系方式

如有问题或建议，请联系：[您的联系方式] 