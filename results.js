// Модуль для обработки результатов теста
const { animePersonalityTypes, typeCompatibility } = require('./config');

/**
 * Определяет тип личности/сверхспособность на основе ответов пользователя
 * @param {Array} answers - массив ответов пользователя
 * @returns {String} - ключ типа сверхспособности
 */
function determinePersonalityType(answers) {
  // Подсчет очков для каждого типа
  const scores = {
    emotionalTelepatia: 0,
    magneticAttraction: 0,
    relationshipAlchemy: 0,
    soulHealer: 0,
    wisdomKeeper: 0,
    specialMomentCreator: 0,
    impossibilityMaster: 0
  };
  
  // Подсчет очков на основе ответов
  answers.forEach(answer => {
    if (answer && answer.type) {
      scores[answer.type] += 1;
    }
  });
  
  // Находим тип с наибольшим количеством очков
  let maxScore = 0;
  let resultType = 'relationshipAlchemy'; // Значение по умолчанию
  
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
 * @param {String} type - тип сверхспособности
 * @returns {Object} - объект с полным описанием результата
 */
function generateResult(type) {
  const personalityType = animePersonalityTypes[type] || animePersonalityTypes.relationshipAlchemy;
  
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
 * Анализирует совместимость двух типов сверхспособностей
 * @param {String} type1 - тип первого пользователя
 * @param {String} type2 - тип второго пользователя
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
    compatibilityText = 'Ваши сверхспособности дополняют друг друга, создавая уникальный баланс. Вместе вы можете видеть и чувствовать намного больше, чем по отдельности.';
  }
  
  // Определяем, насколько совместимы типы (от 1 до 5)
  let compatibilityLevel = 3; // По умолчанию средняя совместимость
  
  // Высокая совместимость для некоторых пар
  if (
    (type1 === 'emotionalTelepatia' && type2 === 'soulHealer') || 
    (type1 === 'soulHealer' && type2 === 'emotionalTelepatia') ||
    (type1 === 'magneticAttraction' && type2 === 'specialMomentCreator') || 
    (type1 === 'specialMomentCreator' && type2 === 'magneticAttraction') ||
    (type1 === 'relationshipAlchemy' && type2 === 'impossibilityMaster') || 
    (type1 === 'impossibilityMaster' && type2 === 'relationshipAlchemy')
  ) {
    compatibilityLevel = 5;
  } 
  // Хорошая совместимость для одинаковых типов
  else if (type1 === type2) {
    compatibilityLevel = 4;
  }
  // Средняя совместимость для комбинаций с wisdom
  else if (
    (type1 === 'wisdomKeeper' || type2 === 'wisdomKeeper')
  ) {
    compatibilityLevel = 3;
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
