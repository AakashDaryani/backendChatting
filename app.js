const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const url = 'mongodb+srv://aakashdaryani50:D8UJ2sSIv3skUoBM@cluster0.92onfj6.mongodb.net/test'
app.use(express.json());
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

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
app.get("/",(req,res)=>{
  res.send("hello world")
})

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
  console.log('Server Start'+PORT);
})
