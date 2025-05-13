const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Item = mongoose.model('Item', { name: String });

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
