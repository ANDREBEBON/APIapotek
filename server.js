const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Mengimpor routes.js
const routes = require("./routes"); // Ubah di sini
routes(app); // Ubah di sini

//Daftar menu routes dari index
const registrasi = require("./middleware");
app.use("/auth", registrasi);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
