import { React, useState, useEffect } from 'react'
import Table from '../general/Table'
import Loader from '../general/loader/Loader'
import Form from '../general/Form'
import '../../App.css'
import Title from "../general/Title"
import ModalDeleteConfirm from "../general/ModalDeleteConfirm"
import jwt_decode from "jwt-decode";

const CrudFolders = ({ setSelectedFolder, userId }) => {
    const [folders, setFolders] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "userId"];
    const [error, setError] = useState(false);
    const URL = "https://back-lifetaskmanager.herokuapp.com/folders/";
    const [folderToDelete, setFolderToDelete] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        setIsLoading(true);
        const getFoldersFromUser = async (url) => {
            try {
                const res = await fetch(url, {
                     headers: {
                         "authorization": JSON.stringify(token)
                    }
                });
                const data = await res.json();
                data.forEach((folder) => {
                    setFolders((folders) => {
                        return [...folders, folder];
                    });
                });
            } catch (error) {
                setError(true);
            }
        } 
        
        if (token){
            var {id} = jwt_decode(token);
            getFoldersFromUser(URL + id + "/user");
            setTimeout(() => {
                setIsLoading(false);
            }, 600);
        }      
    }, [URL])


    const createFolder = (newFolder) => {
        const token = window.localStorage.getItem("token");
        var {id} = jwt_decode(token);
        newFolder.userId = id;
        delete newFolder.id;

        setIsLoading(true);
        try {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                      "authorization": JSON.stringify(token)
                },
                body: JSON.stringify(newFolder)
            }).then(res => res.json())
                .then(newFolder => setFolders([...folders, newFolder]));
        }
        catch (error) {
            setError(true);
        }
        setIsLoading(false);

    };

    const deleteFolder = (folderToDelete) => {
        const token = window.localStorage.getItem("token");
        setIsLoading(true);
        try {
            fetch(URL + folderToDelete.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                     "authorization": JSON.stringify(token)
                },
            }).then((res) => {
                if (res.ok) {
                    setFolders(folders => {
                        return folders.filter(folder => folder.id !== folderToDelete.id);
                    });
                }
            });
        } catch (error) {
            setError(true);
        }
        setIsLoading(false);
        setFolderToDelete(null);
    };

    const handleDeleteFolder = (folderToDelete) => {
        setFolderToDelete(folderToDelete);
    }

    const handleDontDeleteFolder = () => {
        setFolderToDelete(null);
    }

    return (
        <>
            {
                folderToDelete && <ModalDeleteConfirm message={`Are you sure? Tasks inside "${folderToDelete.description}" will be deleted too.`} handleYes={deleteFolder} handleNo={handleDontDeleteFolder} item={folderToDelete} />
            }
            {
                isLoading ? (<div className="centered"><Loader /></div>) :
                    error ? <Title title="Sorry! An error has ocurred. Try again later." />
                        : <><Form className="form"
                            create={createFolder}
                            editedItem={toEdit}
                            setToEdit={setToEdit}
                            itemName={"Folder"}
                        />
                        <Table
                            title="Folders"
                            emptyMessage="There are no folders!"
                            data={folders}
                            setToEdit={setToEdit}
                            deleteItem={handleDeleteFolder}
                            setSelectedFolder={setSelectedFolder}
                            columnNames={columnNames} />
                    </>
         }
        </>
    )
}

export default CrudFolders