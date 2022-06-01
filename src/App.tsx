import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [isTitle, setIsTitle] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [listOfTodos, setListOfTodos] = useState(todos);
  const [todo, setTodo] = useState({
    id: 0,
    title: '',
    userId: 0,
    completed: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!todo.title.trim()) {
      setIsTitle(false);

      return;
    }

    if (!todo.userId) {
      setIsUser(false);

      return;
    }

    setListOfTodos(prev => (
      [...prev, {
        ...todo,
        id: listOfTodos.length + 1,
        userId: +todo.userId,
      }]
    ));

    setTodo({
      id: 0,
      title: '',
      userId: 0,
      completed: false,
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) {
    const {
      name,
      value,
      type,
      checked,
    } = e.currentTarget;

    setTodo(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setIsTitle(true);
    setIsUser(true);
  }

  return (
    <div className="App" onSubmit={handleSubmit}>
      <div className="">
        <h1>Add todo form</h1>
        <div>
          <form className="form">
            <div className="form__container">
              <input
                className={`form__input ${!isTitle && 'invalid-Input'}`}
                type="text"
                id="title"
                name="title"
                value={todo.title}
                onChange={handleChange}
              />
              <label
                className={`form__inputTitle ${todo.title !== '' ? 'notEmpty' : ''}`}
                htmlFor="title"
              >
                Title
              </label>
              {!isTitle && <p className="valid-input">Enter the title</p>}
            </div>
            <div>
              <select
                onChange={handleChange}
                value={todo.userId}
                className={`form__selectUser ${!isUser && 'invalid-Input'}`}
                name="userId"
              >
                <option value="">Select user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              {!isUser && <p className="valid-input">Select user</p>}
            </div>
            <div className="form__inputComplete">
              <label>
                Complete
                <input
                  onChange={handleChange}
                  type="checkbox"
                  name="completed"
                />
              </label>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
      <TodoList todos={listOfTodos} />
    </div>
  );
};

export default App;
