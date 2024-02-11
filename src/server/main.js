import express from "express";
import ViteExpress from "vite-express";
import { db } from "./config/database.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/todos", (req, res) => {
  const q = "SELECT * FROM todos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "SELECT * FROM todos WHERE id=?";
  db.query(q, [todoId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/api/todos", (req, res) => {
  const q = "INSERT INTO todos(`task`,`completed`) values(?)";
  const values = [req.body.task, req.body.completed];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "Todos created successfully!" });
  });
});
app.patch("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "UPDATE todos SET task=?,is_editing=? WHERE id=?";
  const values = [req.body.task, req.body.is_editing];
  db.query(q, [...values, todoId], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "Todos updated successfully!" });
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const q = "DELETE FROM todos WHERE id=?";
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .send({ msg: "Id parameter is required for delete operation" });
  }
  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.affectedRows === 0) {
      return res
        .status(400)
        .json({ error: "Todo not found for this given Id" });
    }
    return res.json({ msg: "Deleted succesfully!" });
  });
});

app.put("/api/todos/:id", (req, res) => {
  const q = "UPDATE todos SET task=?, completed=?, is_editing=? WHERE id=?";
  const todoId = req.params.id;
  const values = [req.body.task, req.body.completed, req.body.is_editing];
  db.query(q, [...values, todoId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json({ msg: "successfully updated!" });
  });
});
app.patch("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const q = "UPDATE todos SET task=?, is_editing=?, completed=? WHERE id=?";
  const values = [req.body.task, req.body.is_editing, req.body.completed];

  // Only update fields that are present in the request body
  const filteredValues = values.filter((value) => value !== undefined);

  db.query(q, [...filteredValues, todoId], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "Successfully updated!" });
  });
});
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
