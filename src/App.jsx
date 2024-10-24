/* imports*/
import { use } from 'framer-motion/client';
import './App.css';
import { useState,useEffect } from 'react';

/* main function */
export default function App() {
  const [todos,settodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];

  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  function editTODO(index) {
    const editText = prompt('Enter new description: ', todos[index].description);
    if (editText.trim() === '') {
      alert('This field cant be empty!!!');
      return;
    } else {
      const newArray = [...todos];
      newArray[index].description = editText;
      settodos(newArray);
    }
  }
  

  /* function to add todos : executes when add button is pressed */
  function addtodos(){
    let newArray = [...todos]
    if(document.getElementById('desc').value.trim() === ''){
      alert('This field cant be empty!!!')
      return
    }
    
    newArray.push({
      description : document.getElementById('desc').value,
      done : false
    })
    document.getElementById('desc').value = ''
    settodos(newArray)
  }

  /* function to delete todos : executes when delete button is pressed */
  function deleteTODO(index){
    const newArray = [...todos]
    newArray.splice(index, 1)
    settodos(newArray)
  }
  
  /* function to display todos */
  function Todo(props){
    return (
      <div style={{display:'flex' ,alignItems:'centre', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center',marginBottom:'2vh'}}>
          <input style={{marginRight:'2vw', width:'2vh', height:'2vh',}} type="checkbox" value=
          {props.done}/>
          <span >{props.description}</span>    
        </div>
        <div id = 'div1'>
          <svg onClick={() => deleteTODO(props.index)} style={{marginLeft:'2vw'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          <svg onClick={() => editTODO(props.index)} style={{marginLeft:'2vw'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </div>
      </div>
      
    )
  }

  /*XML i.e. face of the web app */
  return (
    <div className='whole'>
      <div id='form'>
        <input id = 'desc' placeholder='What TODO ?'></input>
        <button id = 'add' onClick={addtodos}>Add</button>
      </div>
      {todos.length > 0 && (
        <div id="todos">
          {todos.map((todo) => (
        <Todo
          done={todo.done}
          description={todo.description}
          index = {todos.indexOf(todo)}
        />
        ))}
        </div>
      )}
      
    </div>
  );
}



