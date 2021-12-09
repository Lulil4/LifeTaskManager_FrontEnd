import {React, useState, useEffect} from 'react'
import Table from './Table'
import Loader from './Loader'
import Form from './Form'
import '../App.css'
import Title from "./Title"

const CrudTasks = ({selectedFolder}) => {
    const [tasks, setTasks] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "finished"];
    const [error, setError] = useState(false);
    const URL = "http://localhost:3000/tasks";
    const URLFOLDERS = "http://localhost:3000/folders/";
    
    useEffect(() => {
        setIsLoading(true);
        const getTasksFromFolder = async (url) => {
            try {
                const res = await fetch(url + selectedFolder.id + "/tasks", {
                   /* headers: {
                        "authorization": JSON.stringify(token)
                    }*/
                });
                const data = await res.json();
                data.forEach((task) => {
                    setTasks((tasks) => {
                        return [...tasks, task];
                    });
                });
                setIsLoading(false);
            } catch (error) {
               setError(true);
            }
        }
        
        setTimeout(() => {
            getTasksFromFolder(URLFOLDERS);
        }, 600);
    }, [URL, selectedFolder.id])
    

    const createTask = (newTask)=>{
        delete newTask.id;
        delete newTask.userId;
        setIsLoading(true);
        try{
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  //  "authorization": JSON.stringify(token)
                },
                body: JSON.stringify(newTask)
            }).then(res => res.json())
            .then(newTask => setTasks([...tasks, newTask]));
        }
        catch(error){
            setError(true);
        }
        setIsLoading(false);

    };

    const updateTask = (taskUpdated) => {
        setIsLoading(true);
        try{
            fetch(URL + "/" + taskUpdated.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    //"authorization": JSON.stringify(token)
                },
                body: JSON.stringify(taskUpdated)
            }).then((res) => {
                return res.json();
            })
                .then((taskEdited) => {
                    setTasks((tasks) => {
                        return tasks.map((task) => task.id === taskEdited.id ? taskEdited : task);
                    });
                });
        }
        catch(error){
            setError(true);
        }
        setIsLoading(false);
    };

    const deleteTask = (id)=>{
        setIsLoading(true);
        try {
            fetch(URL + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                   // "authorization": JSON.stringify(token)
                },
            }).then((res) => {
                if (res.ok) {
                    setTasks(tasks => {
                        return tasks.filter(task => task.id !== id);
                    });
                }
            });
        } catch (error) {
            setError(true);
        }
        setIsLoading(false);
    };
    
    return (
        <>
            {
                error ? <Title title="Sorry! An error ocurred. Try again later." />
                    : <Form className="form"
                        create={createTask}
                        update={updateTask}
                        editedItem={toEdit}
                        setToEdit={setToEdit}
                        itemName="Task"
                        selectedFolderId={selectedFolder.id}
                    />
            }
            {
                isLoading || error ? (<div className="centered"><Loader /></div>) :
                    <Table
                        title={`Folders > ${selectedFolder.description}`}
                        emptyMessage="Hurray! There are no tasks :)"
                        data={tasks}
                        setToEdit={setToEdit}
                        deleteItem={deleteTask}
                        updateItem={updateTask}
                        columnNames={columnNames} />
            }

        </>
    )
}

export default CrudTasks