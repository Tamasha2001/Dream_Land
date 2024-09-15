import { useState } from "react";
import styles from "./form.module.css";

export default function Form({ todos, setTodos }) {
  const [todo, setTodo] = useState({ name: "", done: false });

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ name: "", done: false });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          onChange={(e) => setTodo({ name: e.target.value, done: false })}
          value={todo.name}
          className={styles.modernInput}
          placeholder="Enter todo item..."
        />
        <button className={styles.modernButton}>Add</button>
      </div>
    </form>
  );
}
