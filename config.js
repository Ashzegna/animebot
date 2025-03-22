// Файл конфигурации для Telegram бота

// Типы сверхспособностей с эмодзи и описаниями
const personalityTypes = {
  emotionalTelepatia: {
    name: 'Эмоциональная телепатия',
    emoji: '🔮💭',
    description: 'Ты обладаешь редким даром понимать невысказанные мысли и чувства других людей. Ты видишь то, что скрыто за словами, читаешь настроение и понимаешь истинные намерения.',
    examples: 'Ты часто знаешь, что человеку нужно, ещё до того, как он сам это осознает',
    songLine: 'Вместе мы - ребус, что хочется разгадать 🔮',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  },
  magneticAttraction: {
    name: 'Магнетическое притяжение',
    emoji: '✨🧲',
    description: 'У тебя есть особое обаяние, которое притягивает людей. Ты центр внимания не потому, что стремишься им быть, а потому что твоя энергия естественно привлекает других.',
    examples: 'Люди часто делятся с тобой секретами и доверяют важными историями',
    songLine: 'Парадокс в квадрате чувств ✨',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  },
  relationshipAlchemy: {
    name: 'Алхимия отношений',
    emoji: '⚗️❤️',
    description: 'Ты умеешь превращать обычные моменты в золотые воспоминания. В твоих руках даже конфликты становятся возможностью для роста, а рутина — источником радости.',
    examples: 'Ты находишь способы сблизить совершенно разных людей',
    songLine: 'Мы не вписываемся в рамки и схемы ⚗️',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  },
  soulHealer: {
    name: 'Целитель душ',
    emoji: '🌱💫',
    description: 'Твоё присутствие приносит покой и ясность. Ты не просто слушаешь — ты исцеляешь своим вниманием, возвращаешь веру в себя тем, кто рядом с тобой.',
    examples: 'После разговора с тобой люди часто чувствуют облегчение и прилив сил',
    songLine: 'Наш пазл сложился, пусть не идеально 🌱',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  },
  wisdomKeeper: {
    name: 'Хранитель мудрости',
    emoji: '📚✨',
    description: 'Ты видишь глубже поверхности и находишь смысл там, где другие видят только хаос. Твоя способность извлекать мудрость из любого опыта делает тебя незаменимым советчиком.',
    examples: 'К тебе обращаются за советом в сложных жизненных ситуациях',
    songLine: 'Головоломка без ключа 📚',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  },
  specialMomentCreator: {
    name: 'Творец особенных моментов',
    emoji: '✨🎭',
    description: 'Ты умеешь создавать моменты волшебства в повседневности. В твоих руках обычный день превращается в приключение, а встреча — в событие, которое запомнится надолго.',
    examples: 'Твои идеи и предложения часто становятся яркими воспоминаниями для всех',
    songLine: 'Ты - мой космос в чашке чая ✨',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  },
  impossibilityMaster: {
    name: 'Мастер невозможного',
    emoji: '🌈🔧',
    description: 'Ты видишь возможности там, где другие опускают руки. Твой уникальный взгляд на проблемы и решительность в их преодолении превращают препятствия в трамплины для роста.',
    examples: 'Ты находишь неожиданные решения в, казалось бы, безвыходных ситуациях',
    songLine: 'Я - твой север, ты мой юг, полюса сошлись вокруг 🌈',
    songUrl: "https://music.yandex.ru/album/35714443/track/136874790"
  }
};

// Совместимость между типами (используется для анализа пар)
const typeCompatibility = {
  emotionalTelepatia: {
    magneticAttraction: 'Ваша совместимость - как магия! Один чувствует, другой вдохновляет. Вместе вы создаете связь, которая удивляет окружающих.',
    relationshipAlchemy: 'Отличное сочетание! Интуитивное понимание помогает превращать даже сложные моменты в возможности для роста.',
    soulHealer: 'Глубокая связь понимания. Ваше общение происходит на уровне, недоступном для большинства людей.',
    wisdomKeeper: 'Проницательный дуэт! Один чувствует, другой осмысляет - вместе вы видите полную картину любой ситуации.',
    specialMomentCreator: 'Вы дополняете друг друга! Понимание желаний и умение создавать особые моменты - прекрасное сочетание.',
    impossibilityMaster: 'Интересная пара! Вы чувствуете потребности друг друга и находите необычные решения вместе.'
  },
  magneticAttraction: {
    relationshipAlchemy: 'Харизматичный союз! Ваша энергия притягивает людей, а способность трансформировать отношения делает их глубокими.',
    soulHealer: 'Вдохновляющее сочетание! Один привлекает внимание, другой создает пространство для исцеления и роста.',
    wisdomKeeper: 'Яркая пара! Магнетизм одного и мудрость другого создают влиятельную и уважаемую команду.',
    specialMomentCreator: 'Звездный дуэт! Вместе вы создаете события, которые остаются в памяти надолго.',
    impossibilityMaster: 'Динамичная связь! Ваша совместная энергия может двигать горы и вдохновлять окружающих.'
  },
  relationshipAlchemy: {
    soulHealer: 'Глубокая трансформирующая связь. Вместе вы создаете пространство, где исцеляются даже самые глубокие раны.',
    wisdomKeeper: 'Мощное сочетание! Умение видеть возможности для роста и извлекать мудрость из опыта делает ваш союз особенным.',
    specialMomentCreator: 'Творческий тандем! Вы превращаете повседневность в приключение и находите радость в каждом моменте.',
    impossibilityMaster: 'Союз созидателей! Вместе вы способны превратить любые трудности в возможности и найти нестандартные решения.'
  },
  soulHealer: {
    wisdomKeeper: 'Глубокая связь понимания и мудрости. Ваше общение происходит на уровне душ.',
    specialMomentCreator: 'Гармоничный союз! Один исцеляет душу, другой наполняет жизнь особыми моментами - идеальный баланс.',
    impossibilityMaster: 'Сильная поддержка! Один дает внутренние силы, другой показывает путь к решению проблем.'
  },
  wisdomKeeper: {
    specialMomentCreator: 'Вдохновляющий союз! Глубина и яркость, мудрость и творчество - вместе вы создаете нечто уникальное.',
    impossibilityMaster: 'Стратегический тандем! Мудрость одного и нестандартный подход другого помогают находить глубокие решения.'
  },
  specialMomentCreator: {
    impossibilityMaster: 'Творческий дуэт инноваторов! Вместе вы можете не только мечтать о невозможном, но и воплощать это в реальность.'
  }
};

// Тексты для бота
const botTexts = {
  welcome: '👋✨ Привет! Я бот "Паззлы"! Узнай, какая сверхспособность скрыта в твоей личности! ✨',
  startTest: '📝✨ Давай начнем тест! Ответь на несколько вопросов, и я определю, какой особый дар есть у тебя в отношениях с людьми.',
  resultIntro: '🎉 Готово! Твоя скрытая сверхспособность:',
  shareInvitation: '🔍✨ Хочешь узнать, какая сверхспособность есть у твоего друга или второй половинки? Отправь тест!',
  customQuestionPrompt: '❓✨ Ты можешь добавить свой вопрос в тест. Твой друг не будет знать, что это твой вопрос.',
  shareLinkMessage: '🔗✨ Отлично! Отправь эту ссылку своему другу. Они не будут знать, что ты увидишь их ответы:',
  receivedTestIntro: '👀✨ Привет! Пройди тест и узнай, какая сверхспособность скрыта в твоей личности! ✨',
  testCompleted: '✅✨ Тест завершен!',
  surpriseMessage: '😲✨ Сюрприз! Твой друг, который отправил тебе этот тест, увидит твои ответы! Хочешь увидеть его сверхспособность?',
  friendCompletedTest: '🎊✨ Твой друг прошел тест! Вот результаты:',
  compatibilityIntro: '💫✨ А вот как ваши сверхспособности дополняют друг друга:',
  aboutBot: 'ℹ️ О боте',
  aboutBotText: 'Этот бот поможет тебе узнать, какая скрытая сверхспособность есть у тебя в отношениях с людьми. Пройди тест и отправь его друзьям, чтобы узнать вашу совместимость!',
  aboutSong: '🎵 О песне "Паззлы"',
  aboutSongText: 'Песня "Паззлы" рассказывает об особенных отношениях, которые не вписываются в стандартные рамки. Послушать полную версию можно по ссылке: https://music.yandex.ru/album/35714443/track/136874790'
};

module.exports = {
  animePersonalityTypes: personalityTypes, // Сохраняем имя переменной для совместимости
  typeCompatibility,
  botTexts
};
