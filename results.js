// Модуль для обработки результатов теста
const { animePersonalityTypes, typeCompatibility } = require('./config');

/**
 * Определяет тип аниме-персонажа на основе ответов пользователя
 * @param {Array} answers - массив ответов пользователя
 * @returns {String} - ключ типа персонажа
 */
function determinePersonalityType(answers) {
  // Подсчет очков для каждого типа
  const scores = {
    tsundere: 0,
    dandere: 0,
    yandere: 0,
    genki: 0,
    kuudere: 0,
    deredere: 0,
    hime: 0
  };
  
  // Подсчет очков на основе ответов
  answers.forEach(answer => {
    if (answer && answer.type) {
      scores[answer.type] += 1;
    }
  });
  
  // Находим тип с наибольшим количеством очков
  let maxScore = 0;
  let resultType = 'genki'; // Значение по умолчанию
  
  Object.keys(scores).forEach(type => {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      resultType = type;
    }
  });
  
  return resultType;
}

/**
 * Генерирует полный результат для пользователя
 * @param {String} type - тип аниме-персонажа
 * @returns {Object} - объект с полным описанием результата
 */
function generateResult(type) {
  const personalityType = animePersonalityTypes[type] || animePersonalityTypes.genki;
  
  return {
    type,
    name: personalityType.name,
    emoji: personalityType.emoji,
    description: personalityType.description,
    examples: personalityType.examples,
    songLine: personalityType.songLine,
    songUrl: personalityType.songUrl
  };
}

/**
 * Анализирует совместимость двух типов персонажей
 * @param {String} type1 - тип первого персонажа
 * @param {String} type2 - тип второго персонажа
 * @returns {Object} - объект с описанием совместимости
 */
function analyzeCompatibility(type1, type2) {
  let compatibilityText = '';
  
  // Проверяем, есть ли специфичное описание для этой пары типов
  if (typeCompatibility[type1] && typeCompatibility[type1][type2]) {
    compatibilityText = typeCompatibility[type1][type2];
  } else if (typeCompatibility[type2] && typeCompatibility[type2][type1]) {
    compatibilityText = typeCompatibility[type2][type1];
  } else {
    // Общее описание, если специфичного нет
    compatibilityText = 'Интересное сочетание! У вас разные характеры, которые могут дополнять друг друга.';
  }
  
  // Определяем, насколько совместимы типы (от 1 до 5)
  let compatibilityLevel = 3; // По умолчанию средняя совместимость
  
  // Некоторые правила совместимости (можно расширить)
  if (type1 === type2) {
    compatibilityLevel = 4; // Одинаковые типы обычно хорошо совместимы
  } else if (
    (type1 === 'tsundere' && type2 === 'deredere') || 
    (type1 === 'deredere' && type2 === 'tsundere') ||
    (type1 === 'dandere' && type2 === 'genki') || 
    (type1 === 'genki' && type2 === 'dandere')
  ) {
    compatibilityLevel = 5; // Отличная совместимость для некоторых пар
  } else if (
    (type1 === 'yandere' && type2 === 'yandere') || 
    (type1 === 'kuudere' && type2 === 'kuudere')
  ) {
    compatibilityLevel = 2; // Низкая совместимость для некоторых пар
  }
  
  // Составляем общую строчку из песни для пары
  const type1Data = animePersonalityTypes[type1];
  const type2Data = animePersonalityTypes[type2];
  
  // Берем строчку из песни в зависимости от уровня совместимости
  let songLine = '';
  if (compatibilityLevel >= 4) {
    songLine = 'Мы с тобой два пазла из разных коробок, края не совпадают, но узор один 🧩✨';
  } else if (compatibilityLevel === 3) {
    songLine = 'Наш пазл сложился, пусть не идеально, но это наша история – уникальная, реальная 📖💫';
  } else {
    songLine = 'Пусть весь мир твердит, что мы не совпадаем, но мы-то знаем, знаем, знаем 👀✨';
  }
  
  return {
    compatibilityLevel,
    compatibilityText,
    songLine,
    emojis: `${type1Data.emoji} + ${type2Data.emoji}`,
    songUrl: type1Data.songUrl // Используем URL песни от первого типа
  };
}

module.exports = {
  determinePersonalityType,
  generateResult,
  analyzeCompatibility
};
