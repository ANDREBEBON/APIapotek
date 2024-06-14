"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

// Tampilkan Data Kategori Berdasarkan id_kategori
exports.kategoriberdasarid = function (req, res) {
  let id = req.params.id;
  const query = `
     SELECT 
    COALESCE(NULLIF(o.namaObat, ''), 
             NULLIF(v.namaVitamin, ''), 
             NULLIF(s.namaSuplemen, '')) AS nama,
    COALESCE(NULLIF(o.gambarObat, ''), 
             NULLIF(v.gambarVitamin, ''), 
             NULLIF(s.gambarSuplemen, '')) AS gambar,
    COALESCE(NULLIF(o.hargaObat, 0), 
             NULLIF(v.hargaVitamin, 0), 
             NULLIF(s.hargaSuplemen, 0)) AS harga,
    COALESCE(NULLIF(o.deskripsiObat, ''), 
             NULLIF(v.deskripsiVitamin, ''), 
             NULLIF(s.deskripsiSuplemen, '')) AS deskripsi
FROM 
    kategori k
LEFT JOIN 
    obat o ON k.id_kategori = o.id_kategori
LEFT JOIN 
    vitamin v ON k.id_kategori = v.id_kategori
LEFT JOIN 
    suplemen s ON k.id_kategori = s.id_kategori
WHERE 
    k.id_kategori = ?
    AND (
        (o.namaObat IS NOT NULL AND o.namaObat <> '') OR
        (v.namaVitamin IS NOT NULL AND v.namaVitamin <> '') OR
        (s.namaSuplemen IS NOT NULL AND s.namaSuplemen <> '') OR
        (o.gambarObat IS NOT NULL AND o.gambarObat <> '') OR
        (v.gambarVitamin IS NOT NULL AND v.gambarVitamin <> '') OR
        (s.gambarSuplemen IS NOT NULL AND s.gambarSuplemen <> '') OR
        (o.hargaObat <> 0) OR
        (v.hargaVitamin <> 0) OR
        (s.hargaSuplemen <> 0) OR
        (o.deskripsiObat IS NOT NULL AND o.deskripsiObat <> '') OR
        (v.deskripsiVitamin IS NOT NULL AND v.deskripsiVitamin <> '') OR
        (s.deskripsiSuplemen IS NOT NULL AND s.deskripsiSuplemen <> '')
    );
`;
  connection.query(query, [id], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//tambahkan data produk
