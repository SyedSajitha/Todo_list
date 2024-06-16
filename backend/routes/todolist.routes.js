// backend/routes/todolist.routes.js
import express from 'express'
import { addTodoTask, getTodoTasks } from '../handlers/todolist.handler.js'

export const addTodoTaskRoutes = express.Router()
try {
    addTodoTaskRoutes.post("/", addTodoTask)
    addTodoTaskRoutes.get("/", getTodoTasks)
} catch (error) {
    
}