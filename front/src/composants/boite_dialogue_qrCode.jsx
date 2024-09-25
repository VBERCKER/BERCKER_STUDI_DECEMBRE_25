import React,{ useState } from 'react';
import Boutton from './bouton';
import Modal from 'react-bootstrap/Modal';

function BoiteDialogue(props) {
  const values = [ 'md-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
     <Boutton btn={"QR-code"} click={() => {handleShow('md-down')}}/>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
      </Modal>
    </>
  );
}

export default BoiteDialogue;