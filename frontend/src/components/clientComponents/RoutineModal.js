import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

const RoutineModal = (props) => {
    const {
      className,
      session
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="info" onClick={toggle}>Routine Detail</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>{session.routine.name}</ModalHeader>
          <ModalBody>
            <h3>Workout List: </h3>
            <ListGroup>
                {session.routine.workouts.map((item) => (
                    <ListGroupItem>
                        <ListGroupItemHeading>{item.workout.name}</ListGroupItemHeading>
                        <ListGroupItemText>Duration: {item.duration} minute(s)</ListGroupItemText>
                    </ListGroupItem>
                ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
  export default RoutineModal;
  