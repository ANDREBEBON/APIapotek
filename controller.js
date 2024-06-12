"use strict";

var response = require("./res"); // reponse menampung data file res.js
var connection = require("./koneksi"); // connection menampung data file koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!"); // response.ok(mengambil properti oke dari res.js) value nya yang ada di dalam kurung
};
