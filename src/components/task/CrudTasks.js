import { React, useState, useEffect } from 'react'
import Table from '../general/Table'
import Loader from '../general/loader/Loader'
import Form from '../general/Form'
import '../../App.css'
import Title from "../general/Title"

const CrudTasks = ({ selectedFolder, setSelectedFolder }) => {
    const [tasks, setTasks] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "finished"];
    const [error, setError] = useState(false);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const URL = "https://back-lifetaskmanager.herokuapp.com/tasks";
    const URLFOLDERS = "https://back-lifetaskmanager.herokuapp.com/folders/";

    useEffect(() => {
        setToken(window.localStorage.getItem("token"));
        setIsLoading(true);
        const getTasksFromFolder = async (url) => {
            try {
                const res = await fetch(url + selectedFolder.id + "/tasks", {
                    headers: {
                        "authorization": JSON.stringify(token)
                    }
                });
                const data = await res.json();
                data.forEach((task) => {
                    setTasks((tasks) => {
                        return [...tasks, task];
                    });
                });
            } catch (error) {
                setError(true);
            }
        }

        getTasksFromFolder(URLFOLDERS);

        setTimeout(() => {
            setIsLoading(false);
        }, 600);
    }, [URL, selectedFolder.id, token])


    const createTask = (newTask) => {
        delete newTask.id;
        delete newTask.userId;
        setIsLoading(true);
        try {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": JSON.stringify(token)
                },
                body: JSON.stringify(newTask)
            }).then(res => res.json())
                .then(newTask => setTasks([...tasks, newTask]));
        }
        catch (error) {
            setError(true);
        }
        setIsLoading(false);

    };

    const updateTask = (taskUpdated) => {
        setIsLoading(true);
        try {
            fetch(URL + "/" + taskUpdated.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": JSON.stringify(token)
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
        catch (error) {
            setError(true);
        }
        setIsLoading(false);
    };

    const deleteTask = (id) => {
        setIsLoading(true);
        try {
            fetch(URL + "/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": JSON.stringify(token)
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
            {isLoading ? (<div className="centered"><Loader /></div>) :
                error ? (<Title title="Sorry! An error has ocurred. Try again later." />)
                    : (
                        <><Form className="form"
                            create={createTask}
                            update={updateTask}
                            editedItem={toEdit}
                            setToEdit={setToEdit}
                            itemName="Task"
                            selectedFolderId={selectedFolder.id}
                        />
                            <Table
                                title={`Folders > ${selectedFolder.description}`}
                                emptyMessage="Hurray! There are no tasks :)"
                                data={tasks}
                                setToEdit={setToEdit}
                                deleteItem={deleteTask}
                                updateItem={updateTask}
                                columnNames={columnNames} />

                            <div className="centered">
                                <button className="button is-primary" onClick={() => { setSelectedFolder(null) }}>Back to folders</button>
                            </div>
                        </>)
            }



        </>
    )
}

export default CrudTasks