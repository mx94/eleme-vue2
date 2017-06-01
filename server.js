let express = require('express');
let path = require('path');
let app = express();
app.listen(3005);

app.use(express.static(path.resolve('./dist')));
app.get('/', (req, res) => {
  res.send('index.html');
});
