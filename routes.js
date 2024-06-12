"use strict";

module.exports = function (app) {
  var myJson = require("./controller");
  var dataController = require("./controller/dataController");
  var registerController = require("./controller/registerController");

  app.route("/").get(myJson.index);
  app.route("/kategori").get(myJson.tampilKategori);
  app.route("/kategori/:id").get(dataController.kategoriberdasarid);
  app.route("/register").post(registerController.dataRegister);
};
