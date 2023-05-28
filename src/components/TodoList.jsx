import React, { useState, useEffect } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import backgroundImage from '../images/image.webp'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TodoList = () => {
  const [updated, setUpdated] = useState(false)
  const [tasks, setTasks] = useState([])
  const [rowIndex, setRowIndex] = useState(null)
  const [taskDetail, setTaskDetail] = useState('')
  const [updateTask, setUpdateTask] = useState('')

  const handleAddTask = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/addTasks', {
        taskDetail: taskDetail,
      })

      toast.success(response.data.message)
      setTaskDetail('')
      fetchTasks() // Refresh tasks after adding a new task
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/deleteTask/${taskId}`,
      )
      toast.success(response.data.message)
      fetchTasks() // Refresh tasks after deleting a task
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    setUpdated(true)
  }, [rowIndex])

  const handleEditTask = async (taskId, index) => {
    try {
      setRowIndex(index)

      const response = await axios.patch('http://localhost:8000/updateTask', {
        id: taskId,
        taskDetail: updateTask,
      })

      toast.success(response.data.message)
      setUpdated(false)
      fetchTasks() // Refresh tasks after updating a task
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getTotalTasks')
      setTasks(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="main">
      <div className="todo-list-container">
        <div className="background-image"></div>
        <div className="todo-list">
          <div className="flex">
            <div className="profile">
              <div className="circle" />
            </div>
          </div>

          <div className="spacer" />
          {/* <h1>Todo List</h1> */}
          <div className="start" style={{ display: 'flex' }}>
            <div>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Add task"
                  value={taskDetail}
                  style={{
                    borderRadius: '5px',
                    border: 'none',
                    height: '2rem',
                    display: 'flex',
                    outline: 'none',
                  }}
                  onChange={(e) => setTaskDetail(e.target.value)}
                />
              </InputGroup>
            </div>

            <div>
              <Button
                variant="primary"
                onClick={handleAddTask}
                style={{
                  borderRadius: '5px',
                  border: 'none',
                  padding: '0.2rem 0.7rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#B79F97',
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>
          <div
            style={{
              marginTo: '1rem',

              height: 'auto',

              // borderRadius: '5px',
              // border: 'none',
              // height: '2rem',
              display: 'block',
              // alignItems: 'center',
              backgroundColor: '#B79F97',
            }}
          >
            {tasks.map((task, index) => (
              <div key={task.id} className="task-item">
                {updated && index === rowIndex ? (
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Update task"
                      style={{
                        borderRadius: '5px',
                        border: 'none',
                        height: '2rem',
                        display: 'flex',
                        outline: 'none',
                      }}
                      value={updateTask}
                      onChange={(e) => setUpdateTask(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      style={{
                        borderRadius: '5px',
                        border: 'none',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#B79F97',
                      }}
                      // variant="primary"
                      onClick={() => handleEditTask(task.id, index)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </InputGroup>
                ) : (
                  <p>{task.taskDetail}</p>
                )}
                <div style={{ display: 'inline-flex' }}>
                  <div>
                    <Button
                      variant="danger"
                      // style={{ backgroundColor: '#B79F97' }}
                      // variant="primary"
                      onClick={handleAddTask}
                      style={{
                        borderRadius: '5px',
                        border: 'none',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#B79F97',
                      }}
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="warning"
                      // style={{ backgroundColor: '#B79F97' }}
                      // variant="primary"
                      onClick={handleAddTask}
                      style={{
                        borderRadius: '5px',
                        border: 'none',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#B79F97',
                      }}
                      onClick={() => setRowIndex(index)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
