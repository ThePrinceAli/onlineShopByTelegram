const TOKEN = "7211317604:AAEhXU5rCRQau2IwFRI-FrHghvWvIbZul28";
import TelegramBot from "node-telegram-bot-api";
// import 'dotenv/config'
import { CardModel } from "./Card.js";
const bot = new TelegramBot(TOKEN, { polling: true });

let textData;
let isWaitingForPhoto = false;

export const startBot = () => {
  let CardInfo = {
    title: "",
    price: "",
    definition: "",
    img: "",
  };
  let fileId;

  bot.on("photo", (msg) => {
    fileId = msg.photo[msg.photo.length - 1].file_id;
  });

  bot.on("message", (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      CardInfo = {
        title: "",
        price: "",
        definition: "",
        img: "",
      };
      return bot.sendMessage(chatId, "Welcome bro", {
        reply_markup: {
          inline_keyboard: [[{ text: "Add Product", callback_data: "add" }]],
        },
      });
    }
    if (textData !== undefined) {
      if (CardInfo.title === "") {
        CardInfo.title = text;
        return bot.sendMessage(chatId, `Please add your product price`);
      } else if (CardInfo.price === "") {
        CardInfo.price = text;
        return bot.sendMessage(chatId, `Please add your product definition`);
      } else if (CardInfo.definition === "") {
        CardInfo.definition = text;
  isWaitingForPhoto = true;
  return bot.sendMessage(chatId, `Please add your product photo`);
      } else if (isWaitingForPhoto) {
        fileId = msg.photo[msg.photo.length - 1].file_id;
        CardInfo.img = fileId;
        CardModel.create(CardInfo);
        CardInfo = { title: "", price: "", definition: "", img: "" };
        isWaitingForPhoto = false;
        textData = undefined;
        return bot.sendMessage(chatId, `Your info has been added`, {
          reply_markup: {
            inline_keyboard: [[{ text: "Add More Product", callback_data: "add" }]],
          },
        });
      }
      
    } else {
      return bot.sendMessage(chatId, "Welcome bro", {
        reply_markup: {
          inline_keyboard: [[{ text: "Add Product", callback_data: "add" }]],
        },
      });
    }
  });
  bot.on("callback_query", (msg) => {
    const chatId = msg.message.chat.id;
    textData = msg.data;
    if (textData === "add") {
      return bot.sendMessage(chatId, `Please add your product title`);
    }
  });
};
