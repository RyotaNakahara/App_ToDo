import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import useTodos from "./hooks/useTodos";
import './styles/App.css';


function App() {
  const {
    todos,
    inputText,
    setInputText,
    addTodo,
    deleteTodo,
    handleToggle,
    editId,
    setEditId,
    editText,
    setEditText,
    handleUpdate,
  } = useTodos();

  return (
    <div className="App">
      <h1>📋 My ToDo App</h1>

      {!editId ? (
        <TodoInput
        inputText={inputText}
        setInputText={setInputText}
        addTodo={addTodo}
        />
      ) : (
        <EditTodo
        editText={editText}
        setEditText={setEditText}
        handleUpdate={handleUpdate}
        setEditId={setEditId}
        />
      )}

      <TodoList
        todos={todos}
        setEditText={setEditText}
        setEditId={setEditId}
        handleToggle={handleToggle}
        deleteTodo={deleteTodo}
      />

      {/* <ul>
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
      </ul> */}
    </div>
  );
}

export default App;