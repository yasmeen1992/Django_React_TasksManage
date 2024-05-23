import React  from "react";
const Task=({id,description,title,viewCompleted,editItem,handleDelete})=>{

  return(

    <li
    key={id}
    className="list-group-item d-flex justify-content-between align-items-center"
  >
    <span
      className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
      title={description}
    >
      {title}
    </span>
    <span>
      <button
        className="btn btn-secondary mx-2"
        onClick={()=>{editItem({ id, description, title, completed: viewCompleted })}}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        onClick={()=>{handleDelete(id)}}
      >
        Delete
      </button>
    </span>
  </li>
  )

}
export default Task;