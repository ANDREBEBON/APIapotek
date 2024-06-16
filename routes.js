"use strict";

module.exports = function (app) {
  var myJson = require("./controller");
  var ObatController = require("./controller/ObatController");
  var UserController = require("./controller/UsersController");
  var InventoryController = require("./controller/InventoryController");
  var SuperController = require("./controller/SuperController");

  //-----ObatController Route-----//
  app.route("/").get(myJson.index);
  app.route("/GetObat").get(ObatController.GetObat);
  app.route("/PostObat").post(ObatController.PostObat);
  app.route("/UpdateObat").put(ObatController.UpdateObat);
  app.route("/DeleteObat").delete(ObatController.DeleteObat);

  //-----ObatController Route-----//
  app.route("/GetUsers").get(UserController.GetUsers);
  // app.route("/PostUsers").post(UserController.PostUsers);
  // app.route("/UpdateUsers/:id").put(UserController.UpdateUsers);
  // app.route("/DeleteUsers/:id").delete(UserController.DeleteUsers);

  //-----InventoryController Route-----//
  app.route("/GetInventory").get(InventoryController.GetInventori);

  //-----SuperController Route-----//
  app.route("/GetSuper").get(SuperController.GetSuper);
  app.route("/PostSuper").post(SuperController.PostSuper);
  app.route("/UpdateSuper/:id").put(SuperController.UpdateSuper);
  app.route("/DeleteSuper/:id").delete(SuperController.DeleteSuper);
};
