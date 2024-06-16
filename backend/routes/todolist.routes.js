// backend/routes/todolist.routes.js
import express from 'express'
import { addTodoTask } from '../handlers/todolist.handler.js'

export const addTodoTaskRoutes = express.Router()
try {
    addTodoTaskRoutes.post("/", addTodoTask)
} catch (error) {
    
}