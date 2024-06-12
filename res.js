"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    value: values // values akan di isi di controller.js
  };
  res.json(data);
  res.end();
};
