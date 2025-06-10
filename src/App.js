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
      <input
        type="text"
        value={inputText}
        placeholder="タスクを入力"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>

      {editId && (
        <div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleUpdate}>保存</button>
          <button onClick={() => {
            setEditId(null);
            setEditText("");
          }}>キャンセル</button>
        </div>
      )}
      {/* <button onClick={handleAdd}>追加</button> */}

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
    </div>
  );
}

export default App;