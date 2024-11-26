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
        <div style={{display:'flex', alignItems:'center',marginBottom:'2vh'}}>
          <input style={{marginRight:'2vw', width:'2vh', height:'2vh'}} type="checkbox" value={props.done}/>
          <span style={{fontSize:18}}>{props.description}</span>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <img onClick={() => deleteTODO(props.index)} style={{marginLeft:'2vw',height:24}} src="./delete.png"/>
            <img onClick={() => editTODO(props.index)} style={{marginLeft:'2vw',height:24}} src="./edit.png" />
          </div>
          
        </div>
    )
  }
  return (
    <div className='whole'>
      <div style={{fontSize:50,display:'flex',justifyContent:'center',marginTop:50}}>
        <b>
        TODOAPP
        </b>
      </div>
      <div id='form'>
        <input id = 'desc' placeholder='What TODO ?' style={{fontSize:18}}/>
        <button id = 'add' onClick={addtodos} style={{fontSize:18}}>Add</button>
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



