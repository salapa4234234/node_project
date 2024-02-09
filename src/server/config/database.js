import mysql from "mysql2";

export const db = mysql.createConnection({
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
