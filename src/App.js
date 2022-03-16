import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const Wave = () => {
  return (
    <svg className={'wave'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FF7F11" fill-opacity="1" d="M0,192L48,176C96,160,192,128,288,101.3C384,75,480,53,576,64C672,75,768,117,864,144C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
  )
}

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue('')

    if (!value) return;
    addTodo(value);
  }

  return (
    <form className={'form'} onSubmit={handleSubmit}>
      <input
        className={'todo-input'}
        type={'text'}
        value={value}
        placeholder={'Enter a todo...'}
        onChange={(e) => setValue(e.target.value)}
      />
      <input className={'submit-button'} type={'submit'} value={'Add Todo'} />
    </form>
  )
}

const Todo = ({ id, text, isComplete, removeTodo }) => {
  const [complete, setComplete] = useState(isComplete);

  return (
    <div
      className={'todo'}
      style={{

        //  The ternary operator determines the colour of the todo,
        //  based on whether it has been completed or not.
        backgroundColor: complete ? 'green' : ''
      }}
      >
      <p className={'todo-text'}
        style={{
          textDecoration: complete ? 'Line-through' : ''
        }}
      >
        {text}
      </p>
      <div className={'todo-actions'}>
        <button className={'remove-button'} onClick={() => removeTodo(id)}>&#10060;</button>
        <button className={'complete-button'} onClick={() => setComplete(!complete)}>Complete</button>
      </div>
    </div>
  )
}

function App() {

  //  Initializing the todos and assigning them an array of objects representing a todo.
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      text: 'Study Web Development',
      isCompleted: false
    },
    {
      id: uuidv4(),
      text: 'Take out the trash',
      isCompleted: false
    },
    {
      id: uuidv4(),
      text: 'Do the dishes',
      isCompleted: false
    }
  ]);

  const addTodo = (text) => {
    const newTodos = [ 
      { 
        id: uuidv4(),
        text,
        isCompleted: false 
      },
      ...todos
    ];

    setTodos(newTodos);
  }

  const removeTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
  }

  return (
    <React.Fragment>
      <Wave />
      <div className={'app-wrapper'}>

        {/* An input element that renders a new todo from the user. */}
        <TodoForm addTodo={addTodo} />
        
        <div className={'todos-container'}>

          {/* Map through each todo in the array and create a <Todo /> for each instance. */}
          {todos.map(todo => (
            
            //  Pass various props to the <Todo /> component.
            <Todo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              isComplete={todo.isCompleted}
              removeTodo={removeTodo}
            />
            ))}
          </div>
        </div>
    </React.Fragment>
  );
}

export default App;
