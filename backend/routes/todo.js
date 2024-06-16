// backend/routes/todo.js

import express from "express";
import { Todo } from "../Models/Todo.js";

const router = express.Router();

// Fetch all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new todo
router.post("/", async (req, res) => {
  try {
    const { title, category, priority } = req.body;
    const newTodo = new Todo({
      title,
      category,
      priority,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, category, priority } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, category, priority },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;