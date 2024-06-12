"use strict";

module.exports = function (app) {
  var myJson = require("./controller"); // myjson menampung data dari controller.js

  app.route("/").get(myJson.index); //ketika url "./" maka get index yang ada di myjson(conrtroller.js)

  app.route("/kategori").get(myJson.tampilKategori); //ketika url "./kategori" maka get tampilKategori dari controller.js.
};
