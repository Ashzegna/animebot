// Вопросы для теста сверхспособностей
const questions = [
  {
    id: 'q1',
    text: 'Как ты обычно реагируешь, когда близкий человек расстроен?',
    options: [
      { text: '🔮 Сразу чувствую, что что-то не так', type: 'emotionalTelepatia' },
      { text: '✨ Нахожу слова, которые поднимают настроение', type: 'magneticAttraction' },
      { text: '⚗️ Превращаю проблему в возможность для роста', type: 'relationshipAlchemy' },
      { text: '🌱 Просто нахожусь рядом и слушаю', type: 'soulHealer' },
      { text: '📚 Помогаю увидеть глубинный смысл ситуации', type: 'wisdomKeeper' },
      { text: '✨ Создаю атмосферу, которая отвлекает от грусти', type: 'specialMomentCreator' },
      { text: '🌈 Предлагаю неожиданное решение проблемы', type: 'impossibilityMaster' }
    ],
    emoji: '❤️🧠'
  },
  {
    id: 'q2',
    text: 'Что тебе чаще всего говорят друзья?',
    options: [
      { text: '🔮 "Ты как будто читаешь мои мысли"', type: 'emotionalTelepatia' },
      { text: '✨ "С тобой всегда интересно и легко"', type: 'magneticAttraction' },
      { text: '⚗️ "Ты всегда находишь плюсы в любой ситуации"', type: 'relationshipAlchemy' },
      { text: '🌱 "После разговора с тобой становится легче"', type: 'soulHealer' },
      { text: '📚 "Твои советы всегда попадают в точку"', type: 'wisdomKeeper' },
      { text: '✨ "Благодаря тебе обычный день становится особенным"', type: 'specialMomentCreator' },
      { text: '🌈 "Ты находишь выход из любой ситуации"', type: 'impossibilityMaster' }
    ],
    emoji: '👥💬'
  },
  {
    id: 'q3',
    text: 'Как ты действуешь в сложной ситуации в отношениях?',
    options: [
      { text: '🔮 Чувствую невысказанные потребности другого', type: 'emotionalTelepatia' },
      { text: '✨ Вдохновляю на открытый диалог', type: 'magneticAttraction' },
      { text: '⚗️ Нахожу в трудностях возможность сблизиться', type: 'relationshipAlchemy' },
      { text: '🌱 Создаю безопасное пространство для эмоций', type: 'soulHealer' },
      { text: '📚 Смотрю глубже, чтобы понять корень проблемы', type: 'wisdomKeeper' },
      { text: '✨ Привношу неожиданный позитив и легкость', type: 'specialMomentCreator' },
      { text: '🌈 Предлагаю нестандартное решение', type: 'impossibilityMaster' }
    ],
    emoji: '🧩🔍'
  },
  {
    id: 'q4',
    text: 'Что больше всего ценят в тебе близкие люди?',
    options: [
      { text: '🔮 Умение понимать без слов', type: 'emotionalTelepatia' },
      { text: '✨ Способность вдохновлять и мотивировать', type: 'magneticAttraction' },
      { text: '⚗️ Талант превращать обычное в особенное', type: 'relationshipAlchemy' },
      { text: '🌱 Умение выслушать и поддержать', type: 'soulHealer' },
      { text: '📚 Глубину мышления и мудрые советы', type: 'wisdomKeeper' },
      { text: '✨ Умение создавать незабываемые моменты', type: 'specialMomentCreator' },
      { text: '🌈 Способность решать "нерешаемые" проблемы', type: 'impossibilityMaster' }
    ],
    emoji: '💖🔍'
  },
  {
    id: 'q5',
    text: 'Как ты ведешь себя в новой компании?',
    options: [
      { text: '🔮 Чувствую настроение людей и подстраиваюсь', type: 'emotionalTelepatia' },
      { text: '✨ Легко завожу разговор и знакомства', type: 'magneticAttraction' },
      { text: '⚗️ Нахожу общий язык даже с очень разными людьми', type: 'relationshipAlchemy' },
      { text: '🌱 Создаю комфортную атмосферу вокруг себя', type: 'soulHealer' },
      { text: '📚 Задаю интересные вопросы и слушаю', type: 'wisdomKeeper' },
      { text: '✨ Привношу энергию и оживление', type: 'specialMomentCreator' },
      { text: '🌈 Объединяю людей необычными способами', type: 'impossibilityMaster' }
    ],
    emoji: '👥🎭'
  },
  {
    id: 'q6',
    text: 'Какую роль ты обычно играешь в близких отношениях?',
    options: [
      { text: '🔮 Тонко чувствую эмоциональные потребности', type: 'emotionalTelepatia' },
      { text: '✨ Вдохновляю на новые цели и свершения', type: 'magneticAttraction' },
      { text: '⚗️ Нахожу способы сделать отношения глубже', type: 'relationshipAlchemy' },
      { text: '🌱 Создаю пространство принятия и поддержки', type: 'soulHealer' },
      { text: '📚 Помогаю увидеть более глубокий смысл', type: 'wisdomKeeper' },
      { text: '✨ Привношу радость и спонтанность', type: 'specialMomentCreator' },
      { text: '🌈 Нахожу решения для любых сложностей', type: 'impossibilityMaster' }
    ],
    emoji: '❤️🧩'
  },
  {
    id: 'q7',
    text: 'Что тебе больше всего помогает в общении с разными людьми?',
    options: [
      { text: '🔮 Интуитивное понимание людей', type: 'emotionalTelepatia' },
      { text: '✨ Естественное обаяние и открытость', type: 'magneticAttraction' },
      { text: '⚗️ Умение найти подход к каждому', type: 'relationshipAlchemy' },
      { text: '🌱 Способность внимательно слушать', type: 'soulHealer' },
      { text: '📚 Глубокое понимание человеческой природы', type: 'wisdomKeeper' },
      { text: '✨ Умение создать особую атмосферу', type: 'specialMomentCreator' },
      { text: '🌈 Нестандартный взгляд на обычные вещи', type: 'impossibilityMaster' }
    ],
    emoji: '🌐💬'
  }
];

// Шаблоны для создания пользовательских вопросов
const customQuestionTemplates = [
  {
    text: 'Что для тебя важнее всего в дружбе?',
    options: [
      '💖 Взаимопонимание без слов',
      '🌟 Яркие впечатления вместе',
      '🛠️ Поддержка в сложные времена',
      '🔄 Возможность быть собой',
      '📈 Взаимный рост и развитие',
      '🧩 Дополнять друг друга'
    ]
  },
  {
    text: 'Как ты чаще всего помогаешь близким?',
    options: [
      '👂 Выслушиваю и понимаю',
      '💡 Предлагаю новые идеи',
      '📚 Делюсь опытом и советами',
      '✨ Поднимаю настроение',
      '🤝 Действую и решаю проблемы',
      '❤️ Просто нахожусь рядом'
    ]
  },
  {
    text: 'Чем ты выделяешься среди друзей?',
    options: [
      '👁️ Замечаю то, что другие не видят',
      '🎭 Умею находить подход к разным людям',
      '🛠️ Решаю самые сложные проблемы',
      '🧠 Дарю мудрые советы',
      '✨ Создаю особую атмосферу',
      '❤️ Умею выслушать и поддержать'
    ]
  }
];

module.exports = {
  questions,
  customQuestionTemplates
};
