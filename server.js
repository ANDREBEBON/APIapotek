const bodyParser = require("body-parser");
const express = require("express");
const app = express();

//panggil routes.js
var routes = require("./routes");
routes(app);

//Parse Aplikasi format json
app.use(bodyParser.urlencoded({ extended: true })); //bodyParser.url
app.use(bodyParser.json()); //bodyParser.json
app.listen(3001, () => {
  console.log(`Server started on port`);
});
