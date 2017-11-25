const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new LineBot({
  channelSecret: 'd79a787909ac3b2fcfbd390bb8ad78e2',
  accessToken: 'Vg7jICG1/NB84HjtYmKXeUoaQUA/YS5Ddd9n1Srcs+2pYLhFVtZS+3WVU1Ab9gZBZLYfc8THa/qTIv9ozUtuYtlwEvNgttEcByA0ABbIa8aLHKK56p+9Lvg/qBoq+ILe/noMW0DY9wWSvzvwYUAN4wdB04t89/1O/w1cDnyilFU=',
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
