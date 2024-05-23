import React, { useState,useEffect } from 'react';
import TabList from './components/Tab';
import TasksList from './components/TasksList';
import Modal from './components/Modal'
import ModalDelete from './components/ModalDelete';
import axios from "axios";



const TaskManager = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [modal, setModal] = useState(false);   
  const [activeItem,setActiveItem]=useState({
    id: null,
    title:"",
    description:"",
    completed:false,
   
  }) 
  const [todoList, setTodoList] = useState([]);

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then(res => {
        setTodoList(res.data);
      
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    refreshList();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const toggle =()=>{
    setModal(!modal);
  }

  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const toggleDeleteModal = (itemId = null) => {
      setItemToDelete(itemId);
      setDeleteModal(!deleteModal);
    };

    const confirmDelete = () => {
      if (itemToDelete !== null) {
        axios
          .delete(`http://localhost:8000/api/tasks/${itemToDelete}/`)
          .then(res => {
            refreshList();
            toggleDeleteModal();
          })
          .catch(err => console.log(err));
      }
    };
  const handleSubmit = (item) => {
    toggle();
    const cleanItem = {
      title: item.title,
      description: item.description,
      completed: item.completed,
      ...(item.id && { id: item.id }) // Include id if it exists
    };
    debugger;
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${cleanItem.id}/`, cleanItem)
        .then(res => {
          refreshList();
          setViewCompleted(cleanItem.completed);
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post("http://localhost:8000/api/tasks/", cleanItem)
        .then(res => {
          refreshList();
          setViewCompleted(cleanItem.completed);
        })
        .catch(err => console.log(err));
    }
    
  };


  const displayCompleted = (status) => {
      setViewCompleted(status);
  };
  const createItem = (item = { title: "", description: "", completed: false }) => {
    setActiveItem(item);
    setModal(!modal);
  };
  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };
  
  const tasksFilter = todoList.filter(item => item.completed === viewCompleted);

  return (
    <main className="content p-3 mb-2 bg-info">
      <h1 className="text-white text-uppercase text-center my-4">Task Manager</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button  className="btn btn-primary" onClick={createItem}>
                Add task
              </button>
            </div>
           <TabList displayCompleted={displayCompleted} viewCompleted={viewCompleted}/>
            <ul className="list-group list-group-flush">
             <TasksList tasks={tasksFilter} viewCompleted={viewCompleted} editItem={editItem} handleDelete={toggleDeleteModal} />
            </ul>
          </div>
        </div>
      </div>
      <footer className='my-5 mb-2 bg-info text-white text-center'>Copyrights 2024&copy; All Right Reserved</footer>
      {modal ? (
  <Modal
    activeItem={activeItem}
    toggle={toggle}
    onSave={handleSubmit}
  />
) : null}
 {deleteModal ? (
  <ModalDelete toggleDeleteModal={toggleDeleteModal} confirmDelete={confirmDelete} />

      ) : null}
    </main>
  );
};
export default TaskManager;
