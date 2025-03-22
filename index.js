const { createBot } = require('./bot');

// Для локального запуска
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN not found!');
  process.exit(1);
}

const bot = createBot(token);

// Запуск бота
if (process.env.NODE_ENV === 'production') {
  // Для Vercel - экспортируем обработчик webhook
  module.exports = async (req, res) => {
    try {
      if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
      } else {
        res.status(200).send('Telegram Bot is running!');
      }
    } catch (error) {
      console.error('Error in webhook handler:', error);
      res.status(500).send('Error handling webhook');
    }
  };
} else {
  // Для локального запуска
  bot.launch()
    .then(() => console.log('Bot started'))
    .catch(err => console.error('Error starting bot:', err));
  
  // Корректное завершение бота
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}