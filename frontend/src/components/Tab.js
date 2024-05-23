import React from 'react'


const TabList=({displayCompleted,viewCompleted})=>{
    return(
        <div className="my-5 tab-list">
        <span
          onClick={() => {displayCompleted(true)}}
          className={viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    )

}
export default TabList;