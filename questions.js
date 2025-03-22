// Вопросы для теста сверхспособностей
const questions = [
  {
    id: 'q1',
    text: 'Как ты обычно реагируешь, когда близкий человек расстроен?',
    options: [
      { text: '🔮 Чувствую без слов', type: 'emotionalTelepatia' },
      { text: '✨ Поднимаю настроение', type: 'magneticAttraction' },
      { text: '⚗️ Превращаю в шанс вырасти', type: 'relationshipAlchemy' },
      { text: '🌱 Просто слушаю рядом', type: 'soulHealer' },
      { text: '📚 Помогаю понять суть', type: 'wisdomKeeper' },
      { text: '✨ Создаю легкую атмосферу', type: 'specialMomentCreator' },
      { text: '🌈 Предлагаю новое решение', type: 'impossibilityMaster' }
    ],
    emoji: '❤️🧠'
  },
  {
    id: 'q2',
    text: 'Что тебе чаще всего говорят друзья?',
    options: [
      { text: '🔮 "Ты читаешь мои мысли"', type: 'emotionalTelepatia' },
      { text: '✨ "С тобой всегда интересно"', type: 'magneticAttraction' },
      { text: '⚗️ "Ты видишь плюсы везде"', type: 'relationshipAlchemy' },
      { text: '🌱 "С тобой становится легче"', type: 'soulHealer' },
      { text: '📚 "Твои советы всегда в точку"', type: 'wisdomKeeper' },
      { text: '✨ "Ты делаешь дни особенными"', type: 'specialMomentCreator' },
      { text: '🌈 "Ты всегда находишь выход"', type: 'impossibilityMaster' }
    ],
    emoji: '👥💬'
  },
  {
    id: 'q3',
    text: 'Как ты действуешь в сложной ситуации в отношениях?',
    options: [
      { text: '🔮 Чувствую скрытые потребности', type: 'emotionalTelepatia' },
      { text: '✨ Вдохновляю на диалог', type: 'magneticAttraction' },
      { text: '⚗️ Нахожу повод сблизиться', type: 'relationshipAlchemy' },
      { text: '🌱 Создаю пространство для чувств', type: 'soulHealer' },
      { text: '📚 Ищу корень проблемы', type: 'wisdomKeeper' },
      { text: '✨ Вношу легкость и позитив', type: 'specialMomentCreator' },
      { text: '🌈 Нахожу нестандартный выход', type: 'impossibilityMaster' }
    ],
    emoji: '🧩🔍'
  },
  {
    id: 'q4',
    text: 'Что больше всего ценят в тебе близкие люди?',
    options: [
      { text: '🔮 Понимание без слов', type: 'emotionalTelepatia' },
      { text: '✨ Умение вдохновлять', type: 'magneticAttraction' },
      { text: '⚗️ Превращение будней в праздник', type: 'relationshipAlchemy' },
      { text: '🌱 Поддержку и внимание', type: 'soulHealer' },
      { text: '📚 Мудрые советы', type: 'wisdomKeeper' },
      { text: '✨ Создание ярких моментов', type: 'specialMomentCreator' },
      { text: '🌈 Решение сложных проблем', type: 'impossibilityMaster' }
    ],
    emoji: '💖🔍'
  },
  {
    id: 'q5',
    text: 'Как ты ведешь себя в новой компании?',
    options: [
      { text: '🔮 Чувствую настроение группы', type: 'emotionalTelepatia' },
      { text: '✨ Легко завожу разговоры', type: 'magneticAttraction' },
      { text: '⚗️ Нахожу общий язык со всеми', type: 'relationshipAlchemy' },
      { text: '🌱 Создаю комфорт вокруг', type: 'soulHealer' },
      { text: '📚 Задаю интересные вопросы', type: 'wisdomKeeper' },
      { text: '✨ Привношу энергию и веселье', type: 'specialMomentCreator' },
      { text: '🌈 Объединяю разных людей', type: 'impossibilityMaster' }
    ],
    emoji: '👥🎭'
  },
  {
    id: 'q6',
    text: 'Какую роль ты обычно играешь в близких отношениях?',
    options: [
      { text: '🔮 Чувствую невысказанное', type: 'emotionalTelepatia' },
      { text: '✨ Вдохновляю на новое', type: 'magneticAttraction' },
      { text: '⚗️ Углубляю связь', type: 'relationshipAlchemy' },
      { text: '🌱 Создаю пространство принятия', type: 'soulHealer' },
      { text: '📚 Помогаю увидеть смысл', type: 'wisdomKeeper' },
      { text: '✨ Добавляю радость и спонтанность', type: 'specialMomentCreator' },
      { text: '🌈 Решаю любые сложности', type: 'impossibilityMaster' }
    ],
    emoji: '❤️🧩'
  },
  {
    id: 'q7',
    text: 'Что тебе больше всего помогает в общении с разными людьми?',
    options: [
      { text: '🔮 Интуиция и эмпатия', type: 'emotionalTelepatia' },
      { text: '✨ Обаяние и открытость', type: 'magneticAttraction' },
      { text: '⚗️ Умение найти подход', type: 'relationshipAlchemy' },
      { text: '🌱 Внимательность к другим', type: 'soulHealer' },
      { text: '📚 Понимание психологии', type: 'wisdomKeeper' },
      { text: '✨ Создание особой атмосферы', type: 'specialMomentCreator' },
      { text: '🌈 Нестандартное мышление', type: 'impossibilityMaster' }
    ],
    emoji: '🌐💬'
  }
];

// Шаблоны для создания пользовательских вопросов (тоже сокращены)
const customQuestionTemplates = [
  {
    text: 'Что для тебя важнее всего в дружбе?',
    options: [
      '💖 Понимание без слов',
      '🌟 Яркие впечатления',
      '🛠️ Поддержка в трудностях',
      '🔄 Возможность быть собой',
      '📈 Взаимный рост',
      '🧩 Дополнять друг друга'
    ]
  },
  {
    text: 'Как ты чаще всего помогаешь близким?',
    options: [
      '👂 Выслушиваю',
      '💡 Предлагаю идеи',
      '📚 Делюсь опытом',
      '✨ Поднимаю настроение',
      '🤝 Помогаю действием',
      '❤️ Просто рядом'
    ]
  },
  {
    text: 'Чем ты выделяешься среди друзей?',
    options: [
      '👁️ Замечаю невидимое',
      '🎭 Нахожу подход ко всем',
      '🛠️ Решаю любые проблемы',
      '🧠 Даю мудрые советы',
      '✨ Создаю атмосферу',
      '❤️ Умею поддержать'
    ]
  }
];

module.exports = {
  questions,
  customQuestionTemplates
};

module.exports = {
  questions,
  customQuestionTemplates
};
