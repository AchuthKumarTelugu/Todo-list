import { createContext, useEffect, useReducer, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import Card from './components/Card'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const inputRef = useRef()
  const addTask = (text) => {
    if (text.length > 0) {
      setTasks([...tasks, {
        id: Date.now(),
        taskName: text,
        completed: false
      }])
    } else {
      alert('enter valid task name')
    }

  }
  const deleteTask = (id) => {
    let modifiedTasks = tasks.filter((task) =>  task.id != id )
    setTasks(modifiedTasks)
  }
  const toggleStatus = (id) => {
    let modifiedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, completed: !task.completed } : task
    })
    setTasks(modifiedTasks)
  }
  useEffect(() => {
    let tasksArr = JSON.parse(localStorage.getItem('tasks'))
    if (tasksArr) {
      let arr = tasksArr
      setTasks(arr)
    }else {
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }

  }, [])
  useEffect(()=>{
    if (tasks.length > 0) {
      console.log('tasks after changing',tasks)
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    
  },[tasks])

  const handleSubmit = () => {
    // addTask(taskName)
    addTask(inputRef.current.value)
    inputRef.current.value = ''
  }
  return (
    <div className='app'>
      <div className="container">
        <h2>Todo list app</h2>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter username" ref={inputRef}
            //  value={taskName} onChange={(e)=>{setTaskName(e.currentTarget.value)}}
            aria-label="Recipient's username" aria-describedby="button-addon2" />

          <button className="btn btn-outline-secondary" onClick={handleSubmit} type="button" id="button-addon2">add task</button>

        </div>
        {
          tasks.length > 0 ? <div className='task-body'>
            {
              tasks.map((value, index) => {
                return <Card key={index} task={value} deleteTask={deleteTask} toggleStatus={toggleStatus} inputRef={inputRef} />
              })
            }
          </div> : ""
        }

      </div>
    </div>
  )
}

export default App
