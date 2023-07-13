import React, { useState, useEffect } from 'react';
import "./App.css";
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';

function App() {
  const getDataFromLS = () => {
    const data = localStorage.getItem('myTodoList');
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [listTodo, setListTodo] = useState(getDataFromLS());

  const addList = (inputText) => {
    if (inputText.trim() !== '') {
      setListTodo([...listTodo, inputText]);
    }
  };

  const editListItem = (index, newText) => {
    const updatedListTodo = [...listTodo];
    updatedListTodo[index] = newText;
    setListTodo(updatedListTodo);
  };

  const removeAll = () => {
    setListTodo([]);
  };

  const deleteListItem = (index) => {
    const updatedListTodo = listTodo.filter((_, i) => i !== index);
    setListTodo(updatedListTodo);
  };

  useEffect(() => {
    localStorage.setItem('myTodoList', JSON.stringify(listTodo));
  }, [listTodo]);

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />

        <div className='heading'>
          <h1 className="app-heading">TODO</h1>
          {listTodo.length > 1 && (
            <button onClick={removeAll}>Remove All</button>
          )}
        </div>
        <hr />
        {listTodo.map((listItem, index) => (
          <Todolist
            listTodo={{
              item: listItem,
              index: index
            }}
            key={index}
            editItem={editListItem}
            deleteItem={deleteListItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
