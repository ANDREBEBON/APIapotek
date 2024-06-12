const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

// Mengimpor routes.js
var routes = require("./routes");
routes(app); // Menggunakan rute

// Parse Aplikasi format json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
