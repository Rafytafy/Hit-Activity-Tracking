import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Detail = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" size="sm" onClick={toggle}>{buttonLabel}Detail</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Detail of Workout</ModalHeader>
        <ModalBody>
            <h2>Name: {props.workout.name}</h2>
            <h5>Primary muscle group: {props.workout.primary}</h5>
            <h5>Secondary mucle group: {props.workout.secondary}</h5>
            <h5>instructions: </h5>
            <p>{props.workout.instructions}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Back</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Detail;