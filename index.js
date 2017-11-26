const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');
const telData = require("./tel.json");
const museum = require("./museum.json");
const fetch = require("node-fetch");
const bot = new LineBot({
  channelSecret: 'c1fdda62b3f4c9d26b1ae080ce92244d',
  accessToken: 'Zi+LwpJ2SGdKilqWTiuZS05OE+FWlQIQ70eYByIZ479iOknL7wCRRxbMAroJ9tTBWUl7MpuEv6L/2Y8+tiE17VhNGIvfzVYamZghPupW3hyfQcrRGh5oL73i1q5fMYJ768RwCsakqBKA6AMcJhkGNQdB04t89/1O/w1cDnyilFU=',
});

const handler = new LineHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onText(/博物館/i, async context => {

  })
  .onEvent(async context => {

    const text = context.event.text //.split(' ')[1];
    //const key = Object.keys(telData).find((tel, index) => tel.indexOf(text) !== -1)
    //if (key)
    //await context.sendText(telData[key]);
    //else {
    console.log(text)
    const res = await fetch(`https://hsinchu-linebot.herokuapp.com/society/webcallback/${encodeURIComponent(text)}/`)
    const suggestion = await res.text();
    console.log(suggestion)
    await context.sendText(suggestion);
    //}
  })
  .onError(async context => {
    console.log(JSON.stringify(context))
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);
const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`server is running on ${port} port...`);
});
