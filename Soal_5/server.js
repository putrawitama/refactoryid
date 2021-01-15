const express = require('express')
const moment = require('moment')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express()
const port = 3000

const newLine= "\r\n";
app.use(bodyParser.json())
app.post('/count', (req, res) => {
  const now = moment().format()
  const host = req.hostname
  const data = {
    counter: req.body.counter,
    'X-RANDOM': req.get('X-RANDOM')
  }

  const log = '['+now+'] Success: POST http://'+host+' '+JSON.stringify(data)+newLine
  fs.stat('server.log', function (err, stat) {
    if (err == null) {
      console.log('File exists');
      fs.appendFile('server.log', log, function (err) {
        if (err) throw err;
      });
    }
    else {
      fs.writeFile('server.log', log, function (err) {
          if (err) throw err;
      });
    }
  });

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})