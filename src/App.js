// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    // 空白orホワイトスペースなら無効
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, done: false }]);
    setTask('');
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggle = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>📋 My ToDo App</h1>
      <input
        type="text"
        value={task}
        placeholder="タスクを入力"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>追加</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => handleToggle(index)}
            >
              {todo.done ? '✅' : '◻'} {todo.text}
            </span>
            <button onClick={() => handleDelete(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// test