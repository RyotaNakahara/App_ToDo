import React, { useState, useEffect } from 'react';
import './App.css';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // ← firebase.js のパス


function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  // アプリ起動時にFirestoreからデータを取得
  useEffect(() => {
    fetchTodos();
  }, []);

  // Firestoreからタスクを取得
  const fetchTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    } catch (error) {
      console.error("データ取得エラー：", error);
    }
  };

  // 新しいタスクをFirestoreに追加
  const addTodo = async () => {
    if (!inputText.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: inputText,
        createdAt: new Date(),
        done: false,
      });

      const newTodo = {
        id: docRef.id,
        text: inputText,
        done: false,
      };

      setTodos([...todos, newTodo]);
      setInputText(""); // 入力欄をクリア
      fetchTodos();     // リストを再取得して更新
    } catch (error) {
      console.error("追加エラー：", error);
    }
  };

  // タスクをFirebaseから削除
  const deleteTodo = async (id) => {
    try{
      await deleteDoc(doc(db, "todos", id));
      fetchTodos();
    } catch (error) {
      console.log("削除エラー", error);
    }
  }


  // const handleAdd = () => {
  //   // 空白orホワイトスペースなら無効
  //   if (task.trim() === '') return;
  //   setTodos([...todos, { text: task, done: false }]);
  //   setTask('');
  // };

  // const handleDelete = (index) => {
  //   const newTodos = [...todos];
  //   newTodos.splice(index, 1);
  //   setTodos(newTodos);
  // };

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
        value={inputText}
        placeholder="タスクを入力"
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>
      {/* <button onClick={handleAdd}>追加</button> */}

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => handleToggle(index)}
            >
              {todo.done ? '✅' : '◻'} {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;