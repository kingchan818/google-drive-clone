import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const { currentUser } = useAuth();
    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
    };
    const handelSubmit = (e) => {
        e.preventDefault();

        if (currentFolder == null) return;
        //create folder in firebase
        db.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            createAt: db.getCurrentTimeStamp(),
            // path:
        });
        console.log('file created');
        setName('');
        closeModal();
    };
    return (
        <>
            <Button onClick={openModal} variant="outline-success" size="sm">
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={(e) => handelSubmit(e)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
