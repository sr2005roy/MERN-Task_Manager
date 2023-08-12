import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Task from './Task'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BURL } from '../App'
import img from "../assets/loader.gif"

export default function TaskList() {
  const [tasks,setTasks] = useState([]);
  const [completedTasks,setCompletedTasks] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const [taskID,setTaskID] = useState("");


  const [formData,setFormData] = useState({
    name:"",
    completed: false
  })
  const handleInputChange = (e) =>{
      const {name,value} = e.target;
      setFormData((p)=>{
        return {...p,[name]:value};
      });
      // console.log(formData);
    }
    const createTask = async (e) =>{
      e.preventDefault();
      console.log(formData);
      if(formData.name === "") return toast.error("input field cannot be empty");
      try{
        // console.log(BURL);
        await axios.post(`${BURL}/api/tasks`,formData);
        toast.success("Task added successfully!");
        setFormData((p)=>{return {...p,name:""}})
        getTasks();
      }
      catch(e){
        toast.error(e.message);
      }
  }

  const getTasks = async () =>{
    setIsLoading(true);
    try{
      const {data} = await axios.get(`${BURL}/api/tasks`);
      // console.log(data);
      setIsLoading(false);
      setTasks(data);
      let ans=0;
      // eslint-disable-next-line
      data.map((i)=>{
        if(i.completed) ans++;
      })
      setCompletedTasks(ans);
    }
    catch(e){
      toast.error(e.message);
      setIsLoading(false);
    }
  }
  const deleteTask = async(id)=>{
    try {
      await axios.delete(`${BURL}/api/tasks/${id}`);
      toast.success("Task Deleted!");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }
  const getSingleTask = (task)=>{
    setFormData({ name: task.name, completed:task.completed});
    setTaskID(task._id);
    setIsEditing(true);
  }
  const editTask = async (e)=>{
    e.preventDefault();
    try {
      await axios.put(`${BURL}/api/tasks/${taskID}`,formData);
      setFormData({
        name:"",
        completed: false
      });
      setTaskID("");
      setIsEditing(false);
      toast.info("Task Updated!!");
      getTasks();
    } catch (error) {
      toast.error(error.message);
      setFormData({
        name:"",
        completed: false
      });
      setTaskID("");
      setIsEditing(false);
    }
  }
  const setTaskCompleted = async (task)=>{
    const newData={
      name: task.name,
      completed: true
    };
    try {
      await axios.put(`${BURL}/api/tasks/${task._id}`,newData);
      toast.success("Mareked Completed!");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }
  const setTaskUnCompleted = async (task)=>{
    const newData={
      name: task.name,
      completed: false
    };
    try {
      await axios.put(`${BURL}/api/tasks/${task._id}`,newData);
      toast.info("Mareked Uncompleted!");
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    getTasks();
  },[]);
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={formData.name} handleInputChange={handleInputChange} createTask={createTask} editTask={editTask} isEditing={isEditing}/>
      <div className="--flex-between --pb">
        <p>
            <b>Total Tasks: </b>{tasks.length}
        </p>
        <p>
          <b>Completed Tasks: </b>{completedTasks}
        </p>
      </div>
      <hr/>
      { isLoading && (
        <div className="--flex-center">
          <img src={img} alt="Loading"/>
        </div>
      )}
      {(!isLoading && tasks.length===0) ? (
        <p className="--py">No Task Added. Please Add A Task</p>
      ) : (
        <>
        {tasks.map((t,index)=>{
          return <Task key={t._id} task={t} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setTaskCompleted={setTaskCompleted} setTaskUnCompleted={setTaskUnCompleted}/>;
        })} 
        </>
      )}
    </div>
  )
}
