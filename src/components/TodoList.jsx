import React from "react";

const TodoList = ({
    todos,
    setEditText,
    setEditId,
    handleToggle,
    deleteTodo
    }) => {
    return (
        <ul>
            {todos.map((todo) => (
            <li key={todo.id}>
                <span
                style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => handleToggle(todo.id)}
                >
                {todo.done ? '✅' : '◻'} {todo.text}
                </span>
                <button onClick={() => {
                setEditId(todo.id);
                setEditText(todo.text);
                }}>編集</button>
                <button onClick={() => deleteTodo(todo.id)}>削除</button>
            </li>
            ))}
        </ul>
  );
};

export default TodoList;