const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// koneksi DB
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_app",
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// CREATE
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product added" });
    }
  );
});

// READ
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// UPDATE
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;
  db.query(
    "UPDATE products SET name=?, price=? WHERE id=?",
    [name, price, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product updated" });
    }
  );
});

// DELETE
app.delete("/products/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product deleted" });
    }
  );
});

app.listen(5000, () => console.log("Backend running on port 5000"));
