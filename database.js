// Простая "база данных" в памяти
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86400 }); // Хранить данные 24 часа

// Получение данных пользователя
function getUser(userId) {
  return cache.get(`user:${userId}`) || null;
}

// Сохранение данных пользователя
function saveUser(userId, userData) {
  return cache.set(`user:${userId}`, userData);
}

// Получение теста по ID
function getTest(testId) {
  return cache.get(`test:${testId}`) || null;
}

// Сохранение теста
function saveTest(testId, testData) {
  return cache.set(`test:${testId}`, testData);
}

module.exports = {
  getUser,
  saveUser,
  getTest,
  saveTest
};