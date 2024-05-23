import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,

  } from "reactstrap";
  

const CustomDeleteModal =({ toggleDeleteModal = () => {}, confirmDelete = () => {}})=>{

    return(
        <Modal isOpen={true} toggle={() => toggleDeleteModal(null)}>
        <ModalHeader toggle={() => toggleDeleteModal(null)}>Delete Task
        
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this task?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>Delete</Button>
          <Button color="secondary" onClick={() => toggleDeleteModal(null)}>Cancel</Button>
        </ModalFooter>
      </Modal>

    )

};
export default CustomDeleteModal;
