import { pool } from "./pool.js";


export async function getTodos() {
  const res = await pool.query("select * from todos")
  return res.rows
}

export async function getTodoById(id) {
  const res = await pool.query("SELECT * FROM todos WHERE id = $1 LIMIT 1", [id])
  return res.rows[0]
}

// create todo
export async function createTodo(title , body) {
  const res = await pool.query(
    "INSERT INTO todos (title, body) VALUES ($1, $2) RETURNING *",
    [title, body],
  );
  console.log(res);
  return res.rows[0];
}



// update todo
export async function updateTodo(id, title, body) {
  const res = await pool.query(
    `UPDATE todos
     SET title = $1, body = $2
     WHERE id = $3
     RETURNING *`,
    [title, body, id]
  );

  return res.rows[0];
}

// delete todo
export async function deleteTodoById(id) {
  const res = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id]
  );

  return res.rows[0];
}

// Toggle todo done status
export async function toggleTodoDone(id) {
  const res = await pool.query(
    `UPDATE todos
     SET done = NOT done
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return res.rows[0];
}


