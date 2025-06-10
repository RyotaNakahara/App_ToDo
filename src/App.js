import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase/firebase.js"; // ← firebase.js のパス


function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

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

  const handleToggle = async(id) => {
    try {
      // ID取得
      const targetTodo = todos.find((todo) => todo.id === id);
      if (!targetTodo) return;

      // Firestore側更新
      updateDoc(doc(db, "todos", id), {
        done: !targetTodo.done,
      });

      // ローカルstate更新
      fetchTodos();

    } catch (error) {
      console.error("完了状態の更新エラー:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "todos", editId), {
        text: editText
      });

      setEditId(null);
      setEditText("");
      fetchTodos(); // 最新のリストを取得して画面更新
    } catch (error) {
      console.error("更新エラー：", error);
    }
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