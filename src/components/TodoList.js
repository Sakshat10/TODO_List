import React, { useState, useRef, useEffect } from 'react';

function Todolist({ listTodo, editItem, deleteItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(listTodo.item);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editItem(listTodo.index, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(listTodo.item);
  };

  const handleChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <li className="list-item">
      {isEditing ? (
        <input
          type="text"
          value={editedText || ''}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
      ) : (
        <span>{listTodo.item}</span>
      )}
      <span className='icons'>
        {isEditing ? (
          <>
            <i className="fa-solid fa-check" onClick={handleSave}></i>
            <i className="fa-solid fa-times" onClick={handleCancel}></i>
          </>
        ) : (
          <>
            <i className="fa-solid fa-pen-to-square" onClick={handleEdit}></i>
            <i
              className="fa-solid fa-trash-can icon-delete"
              onClick={() => deleteItem(listTodo.index)}
            ></i>
          </>
        )}
      </span>
    </li>
  );
}

export default Todolist;
