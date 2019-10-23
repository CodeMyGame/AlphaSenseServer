const express  = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const port = 8080;
app.get('/channels', (_req, res) =>
    res.json(channels));

app.get('/messages/:channel',
    (req, res) => {
      console.log(messages[req.params.channel])
      res.json(messages[req.params.channel])
    });

app.post('/sent',
    (req, res) => {
      console.log(req.body);
      messages[req.body.channel].push(req.body.message);
      res.status(201).end();
    });
app.listen(port,(err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening on ${port}...`);
  }
});

const channels = [
  'channel1',
  'channel2',
  'channel3',
  'channel4',
  'channel5',
];

const messages = {
  'channel1':['kapil.kapil','sdsds'],
  'channel2':[],
  'channel3':[],
  'channel4':[],
  'channel5':[],
};