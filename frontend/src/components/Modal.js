import React, { useState ,useEffect} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const CustomModal = ({ activeItem: initialActiveItem, toggle, onSave }) => {
  const [activeItem, setActiveItem] = useState(initialActiveItem);
  useEffect(() => {
    // Update activeItem state when initialActiveItem changes
    setActiveItem({
      id: initialActiveItem.id || null,
      title: initialActiveItem.title || "",
      description: initialActiveItem.description || "",
      completed: initialActiveItem.completed || false
    });
  }, [initialActiveItem]);
  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
    }
    setActiveItem((prevItem) =>{
    return { ...prevItem, [name]: value };

    } )
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Task Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </FormGroup>
          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={activeItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
