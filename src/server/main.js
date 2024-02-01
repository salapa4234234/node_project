import express from "express";
import ViteExpress from "vite-express";
import mysql from "mysql2";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "papa2055",
  database: "tododb",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected");
});
app.get("/api/getAll", (req, res) => {
  const q = "SELECT * FROM todos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
