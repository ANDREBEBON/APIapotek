"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

// Tampilkan Data Kategori Berdasarkan id_kategori
// dataController.js
exports.kategoriberdasarid = function (req, res) {
  let id = req.params.id;
  const query = `
     SELECT 
    COALESCE(NULLIF(o.namaObat, ''), NULL) AS namaObat,
    COALESCE(NULLIF(o.gambarObat, ''), NULL) AS gambarObat,
    COALESCE(NULLIF(o.hargaObat, 0), NULL) AS hargaObat,
    COALESCE(NULLIF(o.deskripsiObat, ''), NULL) AS deskripsiObat,
    COALESCE(NULLIF(v.namaVitamin, ''), NULL) AS namaVitamin,
    COALESCE(NULLIF(v.gambarVitamin, ''), NULL) AS gambarVitamin,
    COALESCE(NULLIF(v.hargaVitamin, 0), NULL) AS hargaVitamin,
    COALESCE(NULLIF(v.deskripsiVitamin, ''), NULL) AS deskripsiVitamin,
    COALESCE(NULLIF(s.namaSuplemen, ''), NULL) AS namaSuplemen,
    COALESCE(NULLIF(s.gambarSuplemen, ''), NULL) AS gambarSuplemen,
    COALESCE(NULLIF(s.hargaSuplemen, 0), NULL) AS hargaSuplemen,
    COALESCE(NULLIF(s.deskripsiSuplemen, ''), NULL) AS deskripsiSuplemen
FROM 
    kategori k
LEFT JOIN 
    obat o ON k.id_kategori = o.id_kategori
LEFT JOIN 
    vitamin v ON k.id_kategori = v.id_kategori
LEFT JOIN 
    suplemen s ON k.id_kategori = s.id_kategori
WHERE 
    k.id_kategori = 3
    AND (
        (o.namaObat IS NOT NULL AND o.namaObat <> '') OR
        (o.gambarObat IS NOT NULL AND o.gambarObat <> '') OR
        (o.hargaObat IS NOT NULL AND o.hargaObat <> 0) OR
        (o.deskripsiObat IS NOT NULL AND o.deskripsiObat <> '') OR
        (v.namaVitamin IS NOT NULL AND v.namaVitamin <> '') OR
        (v.gambarVitamin IS NOT NULL AND v.gambarVitamin <> '') OR
        (v.hargaVitamin IS NOT NULL AND v.hargaVitamin <> 0) OR
        (v.deskripsiVitamin IS NOT NULL AND v.deskripsiVitamin <> '') OR
        (s.namaSuplemen IS NOT NULL AND s.namaSuplemen <> '') OR
        (s.gambarSuplemen IS NOT NULL AND s.gambarSuplemen <> '') OR
        (s.hargaSuplemen IS NOT NULL AND s.hargaSuplemen <> 0) OR
        (s.deskripsiSuplemen IS NOT NULL AND s.deskripsiSuplemen <> '')
    )

`;
  connection.query(query, [id], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
