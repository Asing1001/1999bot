const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');
const telData = require("telData");

const bot = new LineBot({
  channelSecret: 'c1fdda62b3f4c9d26b1ae080ce92244d',
  accessToken: 'Zi+LwpJ2SGdKilqWTiuZS05OE+FWlQIQ70eYByIZ479iOknL7wCRRxbMAroJ9tTBWUl7MpuEv6L/2Y8+tiE17VhNGIvfzVYamZghPupW3hyfQcrRGh5oL73i1q5fMYJ768RwCsakqBKA6AMcJhkGNQdB04t89/1O/w1cDnyilFU=',
});

const handler = new LineHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onText(/tel/i, async context => {
    const key = Object.keys(telData).find((tel,index)=> tel.indexOf(context.event.text.replace('/tel', ''))!==-1)
    await context.sendText(telData[key]);
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
