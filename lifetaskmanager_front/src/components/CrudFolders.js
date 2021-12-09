import {React, useState, useEffect} from 'react'
import Table from './Table'
import Loader from './Loader'
import Form from './Form'
import '../App.css'
import Title from "./Title"

const CrudFolders = ({setSelectedFolder}) => {
   // const URL = "http://localhost:5000/";
    const [folders, setFolders] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "userId"];
    const [error, setError] = useState(false);
    const URL = "http://localhost:3000/folders";
    
    useEffect(() => {
        setIsLoading(true);
        const getFolders = async (url) => {
            try {
                const res = await fetch(url, {
                   // headers: {
                   //     "authorization": JSON.stringify(token)
                    //}
                });
                const data = await res.json();
                data.forEach((folder) => {
                    setFolders((folders) => {
                        return [...folders, folder];
                    });
                });
                setIsLoading(false);
            } catch (error) {
               setError(true);
            }
        }
        
        setTimeout(() => {
            getFolders(URL);
           setIsLoading(false);
        }, 600);
    }, [URL])
    

    const createFolder = (newFolder)=>{
        newFolder.userId=1;//FOR TESTING!!! CHANGE WHEN LOGIN IS ADDED
        delete newFolder.id;
        
        setIsLoading(true);
        try{
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  //  "authorization": JSON.stringify(token)
                },
                body: JSON.stringify(newFolder)
            }).then(res => res.json())
            .then(newFolder => setFolders([...folders, newFolder]));
        }
        catch(error){
            setError(true);
        }
        setIsLoading(false);

    };

    const deleteFolder = (folderToDelete)=>{
        if(window.confirm(`Are you sure? Tasks inside ${folderToDelete.description} will be deleted too`)){
            setIsLoading(true);
            try {
                fetch(URL + "/" + folderToDelete.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                       // "authorization": JSON.stringify(token)
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
        }
    };

    return (
        <>
            {
                error ? <Title title="Sorry! An error ocurred. Try again later." />
                    : <Form className="form"
                        create={createFolder}
                        editedItem={toEdit}
                        setToEdit={setToEdit}
                        itemName={"Folder"}
                    />
            }
            {
                isLoading || error ? (<div className="centered"><Loader /></div>) :
                    <Table
                        title="Folders"
                        emptyMessage="There are no folders!"
                        data={folders}
                        setToEdit={setToEdit}
                        deleteItem={deleteFolder}
                        setSelectedFolder={setSelectedFolder}
                        columnNames={columnNames} />
            }

        </>
    )
}

export default CrudFolders