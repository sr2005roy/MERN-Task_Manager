import React from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdOutlineDoneOutline,MdNotInterested} from 'react-icons/md'
import {FaRegTrashAlt} from 'react-icons/fa'
export default function Task({index,task,deleteTask,getSingleTask,setTaskCompleted,setTaskUnCompleted}) {
  return (
    <div className={task.completed?"task completed":"task"}>
      <p>
        <b>{index+1}. </b>
        {task.name}
      </p>
      <div className="task-icons">
        {task.completed?(<MdNotInterested color="red" onClick={()=>{setTaskUnCompleted(task)}}/>):(<MdOutlineDoneOutline color='green' onClick={()=>{setTaskCompleted(task)}}/>)}
        <BiEdit color='blue' onClick={()=>{getSingleTask(task)}}/>
        <FaRegTrashAlt color='red' onClick = {()=>{deleteTask(task._id)}}/>
      </div>
    </div>
  )
}