const TOKEN = "7211317604:AAEhXU5rCRQau2IwFRI-FrHghvWvIbZul28";
import TelegramBot from "node-telegram-bot-api";
import { CardModel } from "./Card.js";
const bot = new TelegramBot(TOKEN, { polling: true });

export const startBot = () => {
  let CardInfo = {
    title: "",
    price: "",
    definition: "",
  };
  bot.on("message", (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      return bot.sendMessage(chatId, "Welcome bro", {
        reply_markup: {
          inline_keyboard: [[{ text: "Add Product", callback_data: "add" }]],
        },
      });
    } else if (CardInfo.title === "") {
      CardInfo.title = text;
      return bot.sendMessage(chatId, `Please add your product price`);
    } else if (CardInfo.price === "") {
      CardInfo.price = text;
      return bot.sendMessage(chatId, `Please add your product definition`);
    } else {
      CardInfo.definition = text;
      CardModel.create(CardInfo);
      return bot.sendMessage(chatId, `Your info has added`);
    }
  });
  bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;
    const text = msg.data;
    if (text === "add") {
      return bot.sendMessage(chatId, `Please add your product title`);
    }
  });
};