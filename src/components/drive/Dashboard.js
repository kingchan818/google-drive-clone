import React from 'react';
import { Container } from 'react-bootstrap';
import AddFolderButton from './AddFolderButton';
import NavbarComponent from './Navbar';
import { useFolder } from '../../hooks/useFoler';
import Folder from './Folder';
export default function Dashboard() {
    const { folder, childFolders } = useFolder('5ikukbTC7evvBKy35I6o');

    return (
        <>
            <NavbarComponent />
            <Container fluid>
                <AddFolderButton currentFolder={folder} />
                {childFolders.length > 0 && (
                    <div className="d-flex flex-warp">
                        {childFolders.map((childFolder) => (
                            <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}
                {folder && <Folder folder={folder}></Folder>}
            </Container>
        </>
    );
}
