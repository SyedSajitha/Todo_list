// backend/handlers/todolist.handlers.js
import { Todo } from "../Models/Todo.js";
import { User } from '../Models/User.js';

export const addTodoTask = async (req, res) => {
    try {
        console.log("addTodoTask");
        const { title, priority, addedOn, pinned, category,clerkId } = req.body;
        console.log(title);
        const userExists = await User.find({ clerkId: clerkId });
        if (userExists.length == 0)
            return res.status(401).json({ message: "You're not Authenticated" });

        const userId = userExists[0]._id;
        const newTask = new Todo({
            title, priority, addedOn, pinned, category, userId
        });

        console.log(newTask);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodos = async (req, res) => {
    try {
        const { clerkId } = req.query;
        const userExists = await User.find({ clerkId: clerkId });
        if (userExists.length == 0)
            return res.status(401).json({ message: "You're not Authenticated" });

        const userId = userExists[0]._id;
        const todos = await Todo.find({ userId: userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

