import { eq , sql } from "drizzle-orm";
import { db } from "../pool.js";
import { todos } from "../schema.js";

// get all
export async function getTodos() {
  const res = await db
  .select()
  .from(todos)

  return res
}

// getone by id
export async function getTodoById(id) {
  const res = await db.
  select()
  .from(todos)
  .where(eq(todos.id , id))
  .limit(1);

  if (res.length) {
    return res[0];
  } else {
    return false;
  }
};

// create todo
export async function createTodo(title , body) {
  const res = await db
  .insert(todos)
  .values({
     title: title,
     body: body,
    })
  .returning();
  
  return res[0];
}



// update todo
export async function updateTodo(id, data) {
  const res = await db
  .update(todos)
  .set(data)
  .where(eq(todos.id , id))
  .returning();

  return res[0];
}


// delete todo
export async function deleteTodoById(id) {
  const res = await db
  .delete(todos)
  .where(eq(todos.id, id))
  .returning();

  return res[0];
}

// Toggle todo done status
export async function toggleTodoDone(id) {
  const res = await db
    .update(todos)
    .set({
      done: sql`NOT ${todos.done}`,
    })
    .where(eq(todos.id, id))
    .returning();

  return res[0];
}


