import React from "react";

const TodoInput = ({
  inputText,
  setInputText,
  addTodo,
  editId,
  editText,
  setEditText,
  handleUpdate,
  setEditId,
}) => {
  return (
    <div>
      {/* 新規追加 or 編集中の入力欄 */}
      {!editId ? (
        <>
            <input
                type="text"
                value={inputText}
                placeholder="タスクを入力"
                onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={addTodo}>追加</button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default TodoInput;