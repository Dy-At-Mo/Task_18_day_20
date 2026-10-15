import express from "express";
import { createTodo, getTodoById, getTodos,updateTodo,deleteTodoById,toggleTodoDone } from "../db/todos.query.js" ;

export const todosRouter = express.Router();


// get all todos
todosRouter.get("/" , async(req , res)=>{

    const todos = await getTodos();

      // send as json
    res.json({
      data: todos,
   });

});

// get todos by id
todosRouter.get("/:todo_id", async (req, res) => {

  // get todo by id from database
  const todo = await getTodoById(req.params.todo_id);

  //send as json
  res.json({
    data: todo,
  });
});


// create todo
todosRouter.post("/", async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof body !== "string" ||
      !body.trim()
    ) {
      return res.status(400).json({
        message: "Title and body are required and must be non-empty strings",
      });
    }

    const todo = await createTodo(title.trim(), body.trim());

    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (err) {
    next(err);
  }
});



// update todo
todosRouter.patch("/:todo_id", async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const { todo_id } = req.params;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof body !== "string" ||
      !body.trim()
    ) {
      return res.status(400).json({
        message: "Title and body are required and must be non-empty strings",
      });
    }

    const todo = await updateTodo(todo_id, title, body);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (err) {
    next(err);
  }
});



// update toggle todo done status
todosRouter.patch("/:todo_id/toggle", async (req, res, next) => {
  try {
    const { todo_id } = req.params;

    const todo = await toggleTodoDone(todo_id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    res.json({
      message: "Todo status toggled successfully",
      data: todo
    });
  } catch (err) {
    next(err);
  }
});


// DELETE todo
todosRouter.delete("/:todo_id", async (req, res, next) => {
  try {
    const { todo_id } = req.params;

    const todo = await deleteTodoById(todo_id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (err) {
    next(err);
  }
});

