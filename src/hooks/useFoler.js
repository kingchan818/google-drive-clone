import { useReducer, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const ROOT_FOLDER = {
    name: 'Root',
    id: null,
    path: [],
};

function reducer(state, { type, payload }) {
    switch (type) {
        case 'select-folder':
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: [],
                childFile: [],
            };
        case 'update-folder':
            return {
                ...state,
                folder: payload.folder,
            };
        case 'set-child-folders':
            return {
                ...state,
                childFolders: payload.childFolders,
            };
        default:
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    const { currentUser } = useAuth();
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFile: [],
    });
    useEffect(() => {
        dispatch({
            type: 'select-folder',
            payload: { folderId, folder },
        });
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: 'update-folder',
                payload: {
                    folder: ROOT_FOLDER,
                },
            });
        }
        db.folders
            .doc(folderId)
            .get()
            .then((doc) => {
                console.log(db.formattedDoc(doc));
            })
            .catch((e) =>
                dispatch({
                    type: 'update-folder',
                    payload: {
                        folder: ROOT_FOLDER,
                    },
                })
            );
    }, [folderId]);

    useEffect(() => {
        return (
            db.folders
                .where('parentId', '==', folderId)
                .where('userId', '==', currentUser.uid)
                //.orderBy('createAt')
                .onSnapshot((snap) => {
                    dispatch({
                        type: 'set-child-folders',
                        payload: {
                            childFolders: snap.docs.map(db.formattedDoc),
                        },
                    });
                })
        );
    }, [folderId]);
    return state;
}
