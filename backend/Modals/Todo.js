// backend/Models/Todo.js

import mongoose,{Schema} from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
  addedOn : { type: String , required: true},
  pinned : { type: String , required: true},
  category : {type : String, required: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
