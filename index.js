const express = require("express");
// const bodyParser = require ('body-parser');
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Foodtest",
});

koneksi.connect((err) => {
  if (err) {
    console.log("koneksi eror");
  } else {
    console.log("koneksi aman");
  }
});

//menampilkan semua data

app.get("/api/food", (req, res) => {
  let sql = "SELECT * FROM foodku";
  let query = koneksi.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      msg: "success",
      status: 200,
      results: results,
    });
  });
});
//menampilkan data berdasarkan id

app.get("/api/food/:id", (req, res) => {
  let sql = "SELECT * FROM foodku WHERE id_makanan =" + req.params.id;
  let query = koneksi.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      msg: "success",
      status: 200,
      results: results,
    });
  });
});

//menambahkan data

app.post("/api/food", (req, res) => {
  let data = {
    nama_makanan: req.body.nama_makanan,
    harga: req.body.harga,
  };
  let sql = "INSERT INTO foodku SET ?";
  let query = koneksi.query(sql, data, (err, results) => {
    if (err) throw err;
    let newBody ={
        id: results.insertId,
        ...data,
    }
    res.json({
      msg: "success",
      status: 200,
      results: newBody,
    });
  });
});

app.listen(3000, () => {
  console.log("jalan port 3000");
});
