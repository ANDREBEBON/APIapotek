"use strict";

module.exports = function (app) {
  var myJson = require("./controller");
  var dataController = require("./controller/dataController");
  var registerController = require("./controller/registerController");
  var loginController = require("./controller/loginController");
  var ObatController = require("./controller/editObatController");
  var vitaminController = require("./controller/editVitaminController");
  //route controller
  app.route("/").get(myJson.index);
  //route dari controller
  app.route("/kategori").get(myJson.tampilKategori);
  //route dataController
  app.route("/kategori/:id").get(dataController.kategoriberdasarid);
  //route registerController
  app.route("/register").post(registerController.dataRegister);
  //route loginController
  app.route("/login").post(loginController.dataLogin);

  //route editController_POSTR data
  app.route("/inputobat").post(ObatController.tambahObat);

  //route editController_update data
  app.route("/updateobat").put(ObatController.UpdateObat);

  //route editController_delete data
  app.route("/deleteobat").delete(ObatController.deleteObat);

  //--ROUTE editVitaminController--//
  //route editController_POSTR data
  app.route("/inputvitamin").post(vitaminController.tambahVitamin);

  //route editController_update data
  app.route("/updatevitamin").put(vitaminController.UpdateVitamin);

  //route editController_delete data
  app.route("/deletevitamin").delete(vitaminController.deleteVitamin);
};
