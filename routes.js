"use strict";

module.exports = function (app) {
  var myJson = require("./controller");
  var dataController = require("./controller/dataController");

  app.route("/").get(myJson.index);
  app.route("/kategori").get(myJson.tampilKategori);
  app.route("/kategori/:id").get(dataController.kategoriberdasarid);
};
