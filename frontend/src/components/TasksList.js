import React  from "react";
import Task from "./Task";
const TasksList = ({ tasks, viewCompleted,editItem,handleDelete }) => {   
     const tasksElements =tasks.map(({id,description,title} )=>(<Task handleDelete={handleDelete} editItem={editItem} key={id} id={id} description={description} title={title} viewCompleted={viewCompleted}/>));
     return <div>{tasksElements }</div>
  
    };
  export default TasksList;