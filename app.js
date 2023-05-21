const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/storeMessgae');
const messageSchema = new mongoose.Schema({
  message: String,
  username: String
});
const message = mongoose.model('message', messageSchema);

const storeMessage = (msg) => {

  console.log('recived=>', msg);
  console.log(msg.username);
  console.log(msg.msg);
  const obj = {
    message: msg.message,
    username: msg.username
  }
  const data = new message(obj);
  data.save();
  console.log(data);
  return data;
}

const getMessages = async () =>{
  let data = await message.find();
  console.log('data=>',data);
  return data;
}

app.post("/storeMessage", (req, res) => {
  console.log('Message Recived');
  console.log(req.body);
  res.send(storeMessage(req.body));
});

app.get('/queryMessage', async (req, res) => {
  console.log('retrieve data');
  let data = await getMessages();
  console.log('data=>', data);
  res.send(data);
});

app.listen(PORT, () => {
  console.log('Server Start');
})
