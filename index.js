const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new LineBot({
  channelSecret: '954ee5618ed16a2988b91c6ffc1df931',
  accessToken: 'Ft5RMCpPOP2yPm/QjgJckK6e5pUYIGnZZluswO1dkB1JPze7ZZMOE0wdITOZX7rsPRBeke6HRl05vwMYEKvjIwQwI9IwMq2ERuFePZi/PbWALV2RYVycucwj/jv5EObL0HwKFzb8I/Q8uKm5i9JAnQdB04t89/1O/w1cDnyilFU=',
});

const handler = new LineHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
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
