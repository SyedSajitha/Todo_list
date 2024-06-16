import { Todo } from "../Modals/Todo.js";
import { User } from '../Modals/User.js'

export const addTodoTask = async(req, res)=>{
    try {
       console.log("addTodoTask") 
       const {title, priority , addedOn, pinned , category, clerkId}= await req.body
       console.log(title)
       const userExists = await User.find({ clerkId: clerkId });
        if (userExists.length == 0)
          return res.status(401).json({ message: "You're not Authenticated" });
    
        const userId = userExists[0]._id;
       const newTask = await Todo({
        title, priority , addedOn, pinned, category, userId
       })

       console.log(newTask)
       await newTask.save()
    } catch (error) {
        
    }
}