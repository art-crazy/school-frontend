import { Material } from './types';

export const articles: Material[] = [
  {
    id: 'html-basics',
    title: 'Основы HTML',
    type: 'article',
    category: 'html',
    level: 'beginner',
    content: `# Основы HTML

HTML (HyperText Markup Language) - это стандартный язык разметки для создания веб-страниц.

## Базовая структура
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Моя первая веб-страница</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это параграф.</p>
  </body>
</html>
\`\`\`

## Основные HTML элементы
- Заголовки: от \`<h1>\` до \`<h6>\`
- Параграфы: \`<p>\`
- Ссылки: \`<a href="...">\`
- Изображения: \`<img src="..." alt="...">\`
- Списки: \`<ul>\`, \`<ol>\`, \`<li>\`
- Формы: \`<form>\`, \`<input>\`, \`<button>\`

## Семантический HTML
Современный HTML5 вводит семантические элементы, которые четко описывают их назначение:
- \`<header>\` - шапка страницы
- \`<nav>\` - навигационное меню
- \`<main>\` - основное содержимое
- \`<section>\` - секция документа
- \`<article>\` - независимый контент
- \`<footer>\` - подвал страницы
`,
    estimatedTime: '30 минут',
    prerequisites: []
  },
  {
    id: 'css-fundamentals',
    title: 'Основы CSS',
    type: 'article',
    category: 'css',
    level: 'beginner',
    content: `# Основы CSS

CSS (Cascading Style Sheets) - это язык стилей, используемый для описания внешнего вида документа.

## Базовый синтаксис
\`\`\`css
selector {
  свойство: значение;
}
\`\`\`

## Основные свойства
- Цвет: \`color\`, \`background-color\`
- Типографика: \`font-family\`, \`font-size\`, \`font-weight\`
- Расположение: \`display\`, \`position\`, \`margin\`, \`padding\`
- Блочная модель: \`width\`, \`height\`, \`border\`, \`box-sizing\`

## CSS селекторы
- По элементу: \`p {}\`
- По классу: \`.class {}\`
- По ID: \`#id {}\`
- По атрибуту: \`[type="text"] {}\`
- Псевдоклассы: \`:hover\`, \`:focus\`, \`:active\`
`,
    estimatedTime: '45 минут',
    prerequisites: ['html-basics']
  }
]; 