// Обновленный файл bot.js с улучшенной функциональностью уведомлений
// Внесите следующие изменения в ваш файл bot.js

const { Telegraf, Markup } = require('telegraf');
const { v4: uuidv4 } = require('uuid');
const { botTexts } = require('./config');
const { questions, customQuestionTemplates } = require('./questions');
const { determinePersonalityType, generateResult, analyzeCompatibility } = require('./results');
const { getUser, saveUser, getTest, saveTest } = require('./database');

// Создание экземпляра бота
const createBot = (token) => {
  const bot = new Telegraf(token);

  // Обработка команды /start
  bot.start(async (ctx) => {
    const userId = ctx.from.id;
    const startPayload = ctx.startPayload;
    
    // Инициализация пользователя в базе данных
    let user = getUser(userId);
    if (!user) {
      user = {
        id: userId,
        name: ctx.from.first_name,
        username: ctx.from.username,
        state: 'start',
        answers: [],
        currentQuestion: 0,
        results: null,
        customQuestion: null,
        customQuestionOptions: [],
        testsSent: [],
        testsReceived: [],
        unreadResults: [] // Новый массив для хранения непрочитанных результатов
      };
      saveUser(userId, user);
    }
    
    // Если есть payload в /start, значит пользователь пришел по ссылке от другого пользователя
    if (startPayload) {
      const testId = startPayload;
      const test = getTest(testId);
      
      if (test && test.status === 'pending') {
        // Связываем тест с получателем
        test.receiver = userId;
        saveTest(testId, test);
        
        // Добавляем тест в список полученных тестов пользователя
        user.testsReceived.push(testId);
        user.state = 'test_received';
        user.currentTest = testId;
        user.currentQuestion = 0;
        user.answers = [];
        saveUser(userId, user);
        
        // Приветствуем и начинаем тест
        await ctx.reply(botTexts.receivedTestIntro);
        return startTest(ctx);
      } else {
        // Если тест не найден или уже завершен
        await ctx.reply('К сожалению, этот тест недоступен или уже пройден. Хочешь начать новый тест?');
        await ctx.reply(botTexts.welcome);
        return showMainMenu(ctx);
      }
    }
    
    // Стандартное приветствие
    await ctx.reply(botTexts.welcome);
    return showMainMenu(ctx);
  });

  // Показать главное меню
  async function showMainMenu(ctx) {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (user) {
      user.state = 'main_menu';
      saveUser(userId, user);
      
      // Проверяем наличие непрочитанных результатов
      const hasUnreadResults = user.unreadResults && user.unreadResults.length > 0;
      
      const buttons = [
        ['🧪 Пройти тест', '📤 Отправить тест другу']
      ];
      
      if (hasUnreadResults) {
        buttons.push([`🔔 Новые результаты (${user.unreadResults.length})`]);
      }
      
      buttons.push(['ℹ️ О боте', '🎵 О песне "Неправильные правила"']);
      
      return ctx.reply('Что хочешь сделать?', Markup.keyboard(buttons).resize());
    }
  }

  // Начать тест
  async function startTest(ctx) {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (user) {
      user.state = 'testing';
      user.currentQuestion = 0;
      user.answers = [];
      saveUser(userId, user);
      
      await ctx.reply(botTexts.startTest, Markup.removeKeyboard());
      return askQuestion(ctx, 0);
    }
  }

  // Задать вопрос
  async function askQuestion(ctx, questionIndex) {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user) return;
    
    // Если пользователь проходит полученный тест и дошел до пользовательского вопроса
    if (user.state === 'test_received' && user.currentTest) {
      const test = getTest(user.currentTest);
      if (test && questionIndex === questions.length && test.customQuestion) {
        // Задаем пользовательский вопрос
        const customQuestion = test.customQuestion;
        const options = test.customQuestionOptions;
        
        const buttons = options.map((option, index) => 
          Markup.button.callback(`${index + 1}️⃣ ${option}`, `custom_answer_${index}`)
        );
        
        await ctx.reply(`${customQuestion} ${questionIndex + 1}/${questions.length + 1}`, 
          Markup.inlineKeyboard(buttons, { columns: 1 })
        );
        
        user.currentQuestion = questionIndex;
        saveUser(userId, user);
        return;
      }
    }
    
    // Если все стандартные вопросы пройдены
    if (questionIndex >= questions.length) {
      return finishTest(ctx);
    }
    
    // Задаем обычный вопрос из списка
    const question = questions[questionIndex];
    const buttons = question.options.map((option, index) => 
      Markup.button.callback(option.text, `answer_${questionIndex}_${index}`)
    );
    
    await ctx.reply(`${question.emoji} ${question.text} ${questionIndex + 1}/${questions.length}`, 
      Markup.inlineKeyboard(buttons, { columns: 1 })
    );
    
    user.currentQuestion = questionIndex;
    saveUser(userId, user);
  }

  // Обработка ответов на обычные вопросы
  bot.action(/answer_(\d+)_(\d+)/, async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user) return;
    
    const questionIndex = parseInt(ctx.match[1]);
    const answerIndex = parseInt(ctx.match[2]);
    
    const question = questions[questionIndex];
    const answer = question.options[answerIndex];
    
    // Сохраняем ответ
    user.answers[questionIndex] = answer;
    saveUser(userId, user);
    
    await ctx.answerCbQuery(`Выбрано: ${answer.text}`);
    
    // Переходим к следующему вопросу
    return askQuestion(ctx, questionIndex + 1);
  });

  // Обработка ответов на пользовательский вопрос
  bot.action(/custom_answer_(\d+)/, async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user || !user.currentTest) return;
    
    const answerIndex = parseInt(ctx.match[1]);
    const test = getTest(user.currentTest);
    
    if (!test) return;
    
    // Сохраняем ответ на пользовательский вопрос
    const customAnswer = test.customQuestionOptions[answerIndex];
    user.customAnswer = customAnswer;
    saveUser(userId, user);
    
    await ctx.answerCbQuery(`Выбрано: ${customAnswer}`);
    
    // Завершаем тест
    return finishTest(ctx);
  });

  // Завершение теста
  async function finishTest(ctx) {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user) return;
    
    // Определяем тип личности на основе ответов
    const personalityType = determinePersonalityType(user.answers);
    const result = generateResult(personalityType);
    
    user.results = result;
    user.state = 'test_completed';
    saveUser(userId, user);
    
    // Отправляем результат
    const resultMessage = `
${botTexts.resultIntro}

${result.emoji} *${result.name}* ${result.emoji}

${result.description}

*Известные примеры:* ${result.examples}

*Твоя строчка из песни:*
${result.songLine}

🎧 [Послушать песню](${result.songUrl})
`;
    
    await ctx.reply(resultMessage, { parse_mode: 'Markdown' });
    
    // Если это был тест, отправленный другим пользователем
    if (user.state === 'test_received' && user.currentTest) {
      const test = getTest(user.currentTest);
      
      if (test) {
        // Обновляем данные теста
        test.status = 'completed';
        test.receiverAnswers = [...user.answers];
        test.receiverResult = result;
        test.receiverCustomAnswer = user.customAnswer;
        test.completedAt = new Date().toISOString();
        saveTest(test.id, test);
        
        // Предлагаем посмотреть результаты отправителя
        await ctx.reply(botTexts.surpriseMessage, 
          Markup.inlineKeyboard([
            Markup.button.callback('👀 Да, хочу увидеть!', 'view_sender_results')
          ])
        );
        
        // Отправляем уведомление отправителю с улучшенным форматированием
        try {
          const sender = getUser(test.sender);
          if (sender) {
            // Добавляем тест в список непрочитанных результатов
            if (!sender.unreadResults) sender.unreadResults = [];
            sender.unreadResults.push(test.id);
            saveUser(sender.id, sender);
            
            // Отправляем привлекательное уведомление
            bot.telegram.sendMessage(
              sender.id,
              `🎉 РЕЗУЛЬТАТЫ ПРИШЛИ! 🎉\n\nТвой друг ${ctx.from.first_name} прошел тест! Теперь ты можешь узнать, какой он персонаж аниме и увидеть ответы на все вопросы, включая твой собственный!`,
              Markup.inlineKeyboard([
                Markup.button.callback('👀 Посмотреть результаты', `view_receiver_results_${test.id}`)
              ])
            );
          }
        } catch (error) {
          console.error('Error sending notification to sender:', error);
        }
      }
    } else {
      // Если это был обычный тест, предлагаем отправить тест другу
      await ctx.reply(botTexts.shareInvitation, 
        Markup.inlineKeyboard([
          Markup.button.callback('📱 Отправить тест другу', 'share_test')
        ])
      );
    }
    
    setTimeout(() => {
      showMainMenu(ctx);
    }, 2000);
  }

  // Просмотр результатов отправителя
  bot.action('view_sender_results', async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user || !user.currentTest) return;
    
    const test = getTest(user.currentTest);
    if (!test) return;
    
    const sender = getUser(test.sender);
    if (!sender || !sender.results) return;
    
    const senderResult = sender.results;
    
    // Отправляем результаты отправителя
    const resultMessage = `
Результаты твоего друга:

${senderResult.emoji} *${senderResult.name}* ${senderResult.emoji}

${senderResult.description}

*Строчка из песни друга:*
${senderResult.songLine}

🎧 [Послушать песню](${senderResult.songUrl})
`;
    
    await ctx.reply(resultMessage, { parse_mode: 'Markdown' });
    
    // Анализируем совместимость
    const compatibility = analyzeCompatibility(user.results.type, senderResult.type);
    
    const compatibilityMessage = `
${botTexts.compatibilityIntro}

${compatibility.emojis}

*Уровень совместимости:* ${'⭐'.repeat(compatibility.compatibilityLevel)}

${compatibility.compatibilityText}

*Ваша общая строчка из песни:*
${compatibility.songLine}

🎧 [Послушать песню](${compatibility.songUrl})
`;
    
    await ctx.reply(compatibilityMessage, { parse_mode: 'Markdown' });
    
    await ctx.answerCbQuery();
  });

  // Просмотр результатов получателя (улучшенная версия)
  bot.action(/view_receiver_results_(.+)/, async (ctx) => {
    const userId = ctx.from.id;
    const testId = ctx.match[1];
    
    const test = getTest(testId);
    if (!test || test.status !== 'completed') {
      await ctx.reply('Результаты пока недоступны.');
      await ctx.answerCbQuery();
      return;
    }
    
    const receiver = getUser(test.receiver);
    if (!receiver) {
      await ctx.reply('Информация о получателе недоступна.');
      await ctx.answerCbQuery();
      return;
    }
    
    // Удаляем тест из списка непрочитанных результатов
    const user = getUser(userId);
    if (user && user.unreadResults) {
      user.unreadResults = user.unreadResults.filter(id => id !== testId);
      saveUser(userId, user);
    }
    
    // Отправляем результаты получателя
    const receiverResult = test.receiverResult;
    
    const resultMessage = `
📊 *Результаты твоего друга ${receiver.name}:*

${receiverResult.emoji} *${receiverResult.name}* ${receiverResult.emoji}

${receiverResult.description}

*Строчка из песни друга:*
${receiverResult.songLine}
`;
    
    await ctx.reply(resultMessage, { parse_mode: 'Markdown' });
    
    // Отображаем ответы на стандартные вопросы (новый блок)
    let responsesMessage = "*Ответы на вопросы:*\n\n";
    for (let i = 0; i < Math.min(test.receiverAnswers.length, questions.length); i++) {
      const question = questions[i];
      const answer = test.receiverAnswers[i];
      if (question && answer) {
        responsesMessage += `*Вопрос ${i+1}:* ${question.text}\n`;
        responsesMessage += `*Ответ:* ${answer.text}\n\n`;
      }
    }
    
    await ctx.reply(responsesMessage, { parse_mode: 'Markdown' });
    
    // Если был пользовательский вопрос, показываем ответ на него
    if (test.customQuestion && test.receiverCustomAnswer) {
      await ctx.reply(`
💡 *Твой персональный вопрос был:* 
"${test.customQuestion}"

✨ *Ответ друга:* 
"${test.receiverCustomAnswer}"
`, { parse_mode: 'Markdown' });
    }
    
    // Анализируем совместимость
    const sender = getUser(test.sender);
    if (sender && sender.results) {
      const compatibility = analyzeCompatibility(sender.results.type, receiverResult.type);
      
      const compatibilityMessage = `
${botTexts.compatibilityIntro}

${compatibility.emojis}

*Уровень совместимости:* ${'⭐'.repeat(compatibility.compatibilityLevel)}

${compatibility.compatibilityText}

*Ваша общая строчка из песни:*
${compatibility.songLine}

🎧 [Послушать песню](${compatibility.songUrl})
`;
      
      await ctx.reply(compatibilityMessage, { parse_mode: 'Markdown' });
    }
    
    await ctx.answerCbQuery();
  });

  // Отправка теста другу
  bot.action('share_test', async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user || !user.results) {
      await ctx.reply('Сначала пройди тест, чтобы отправить его другу!');
      await ctx.answerCbQuery();
      return;
    }
    
    user.state = 'creating_custom_question';
    saveUser(userId, user);
    
    // Предлагаем добавить свой вопрос
    await ctx.reply(botTexts.customQuestionPrompt);
    
    // Выбираем случайный шаблон вопроса из доступных
    const randomTemplate = customQuestionTemplates[Math.floor(Math.random() * customQuestionTemplates.length)];
    
    const buttons = randomTemplate.options.map((option, index) => 
      Markup.button.callback(`${index + 1}️⃣ ${option}`, `select_custom_question_${index}`)
    );
    
    buttons.push(Markup.button.callback('✏️ Написать свой вопрос', 'write_custom_question'));
    
    await ctx.reply(`Предлагаю такой вопрос: "${randomTemplate.text}"`,
      Markup.inlineKeyboard(buttons, { columns: 1 })
    );
    
    user.tempCustomQuestion = randomTemplate.text;
    user.tempCustomQuestionOptions = [...randomTemplate.options];
    saveUser(userId, user);
    
    await ctx.answerCbQuery();
  });

  // Обработка выбора готового вопроса
  bot.action(/select_custom_question_(\d+)/, async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);
    
    if (!user || !user.tempCustomQuestion) return;
    
    const optionIndex = parseInt(ctx.match[1]);
    if (optionIndex >= 0 && optionIndex < user.tempCustomQuestionOptions.length) {
      // Генерируем ID для теста
      const testId = uuidv4();
      
      // Создаем объект теста
      const test = {
        id: testId,
        sender: userId,
        receiver: null,
        senderResult: user.results,
        customQuestion: user.tempCustomQuestion,
        customQuestionOptions: user.tempCustomQuestionOptions,
        senderAnswers: user.answers,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      saveTest(testId, test);
      
      // Обновляем данные пользователя
      user.testsSent.push(testId);
      user.state = 'test_sent';
      saveUser(userId, user);
      
      // Формируем ссылку для отправки
      const botUsername = ctx.botInfo.username;
      const shareLink = `https://t.me/${botUsername}?start=${testId}`;
      
      await ctx.reply(`${botTexts.shareLinkMessage}\n\n${shareLink}`);
    }
    
    await ctx.answerCbQuery();
  });

  // Обработка текстовых сообщений
  bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const user = getUser(userId);
    const text = ctx.message.text;
    
    if (!user) return;
    
    // Обработка команд из главного меню
    if (user.state === 'main_menu') {
      if (text === '🧪 Пройти тест') {
        return startTest(ctx);
      } else if (text === '📤 Отправить тест другу') {
        if (!user.results) {
          await ctx.reply('Сначала пройди тест, чтобы отправить его другу!');
          return;
        }
        
        // Запускаем процесс отправки теста
        user.state = 'creating_custom_question';
        saveUser(userId, user);
        
        await ctx.reply(botTexts.customQuestionPrompt);
        
        // Выбираем случайный шаблон вопроса
        const randomTemplate = customQuestionTemplates[Math.floor(Math.random() * customQuestionTemplates.length)];
        
        const buttons = randomTemplate.options.map((option, index) => 
          Markup.button.callback(`${index + 1}️⃣ ${option}`, `select_custom_question_${index}`)
        );
        
        buttons.push(Markup.button.callback('✏️ Написать свой вопрос', 'write_custom_question'));
        
        await ctx.reply(`Предлагаю такой вопрос: "${randomTemplate.text}"`,
          Markup.inlineKeyboard(buttons, { columns: 1 })
        );
        
        user.tempCustomQuestion = randomTemplate.text;
        user.tempCustomQuestionOptions = [...randomTemplate.options];
        saveUser(userId, user);
        
        return;
      } else if (text.includes('Новые результаты')) {
        // Показать список непрочитанных результатов
        if (user.unreadResults && user.unreadResults.length > 0) {
          await ctx.reply(`У тебя есть ${user.unreadResults.length} непрочитанных результатов! Вот они:`);
          
          const buttons = [];
          for (const testId of user.unreadResults) {
            const test = getTest(testId);
            if (test && test.receiver) {
              const receiver = getUser(test.receiver);
              if (receiver) {
                buttons.push([
                  Markup.button.callback(
                    `Результаты от ${receiver.name} (${new Date(test.completedAt).toLocaleDateString()})`, 
                    `view_receiver_results_${testId}`
                  )
                ]);
              }
            }
          }
          
          if (buttons.length > 0) {
            await ctx.reply('Выбери результат для просмотра:', 
              Markup.inlineKeyboard(buttons)
            );
          } else {
            await ctx.reply('Произошла ошибка при загрузке результатов. Попробуй позже.');
          }
        } else {
          await ctx.reply('У тебя нет непрочитанных результатов.');
        }
        return;
      } else if (text === 'ℹ️ О боте') {
        await ctx.reply('Этот бот поможет тебе узнать, какой ты персонаж аниме в отношениях. Пройди тест и отправь его друзьям, чтобы узнать вашу совместимость!');
        return;
      } else if (text === '🎵 О песне "Пазлы"') {
        await ctx.reply('Песня "Пазлы" рассказывает об особенных отношениях, которые не вписываются в стандартные рамки. Послушать полную версию можно по ссылке: "https://music.yandex.ru/album/35714443/track/136874790"');
        return;
      }
    }
    
    // Другие обработчики текста можно добавить здесь
  });

  return bot;
};

module.exports = { createBot };
