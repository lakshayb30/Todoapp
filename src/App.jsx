/* imports*/
import './App.css';
import { useState } from 'react';

/* main function */
export default function App() {
  const [todos,settodos] = useState([])
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
      <div style={{display:'flex'}}>
        <div style={{display:'flex', alignItems:'center',marginBottom:'2vh'}}>
          <input style={{marginRight:'2vw'}} type="checkbox" value=
          {props.done}/>
          <span >{props.description}</span>    
        </div>
        <div>
          <button onClick={() => deleteTODO(props.index)} style={{marginLeft:'2vw'}}>Delete</button>    
          <button onClick={() => editTODO(props.index)} style={{marginLeft:'2vw'}}>Edit</button>
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
      <div id='todos'>
        {todos.map((todo) => (
        <Todo
          done={todo.done}
          description={todo.description}
          index = {todos.indexOf(todo)}
        />
        ))}
    
      </div>
      
      
    </div>
  );
}



