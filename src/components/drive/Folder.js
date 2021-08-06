import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
export default function Folder({ folder }) {
    return (
        <Button as={Link} variant="outline-dark" className="text-truncate w-100">
            <FontAwesomeIcon icon={faFolder} className="mar-2 "></FontAwesomeIcon>
            {folder.name}
        </Button>
    );
}
