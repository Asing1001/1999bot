const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new LineBot({
  channelSecret: '5e67e6762bc5bbea44717dfa06d0ea25',
  accessToken: 'xj7CqtkLmTlCsNhkO7N9Gt4dUa6loWCXXCXx7vgZ7u0cOcYG4o6bkJ5GoweiGUj7ZLYfc8THa/qTIv9ozUtuYtlwEvNgttEcByA0ABbIa8aD+VElEWDjdIdZphQdWg+pt0DQeIB0EX2TrdQXqWhPxAdB04t89/1O/w1cDnyilFU=',
});

const handler = new LineHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onEvent(async context => {
    //await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);
const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`server is running on ${port} port...`);
});
