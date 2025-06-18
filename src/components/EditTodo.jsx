import React from "react";

const EditTodo = ({
  editText,
  setEditText,
  handleUpdate,
  setEditId,
}) => {
  return (
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
  );
};

export default EditTodo;