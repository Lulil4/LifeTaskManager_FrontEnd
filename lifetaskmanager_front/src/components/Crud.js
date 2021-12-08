import {React, useState, useEffect} from 'react'
import Table from './Table'
import Loader from './Loader'
import Form from './Form'
import '../App.css'
import Title from "./Title"

const Crud = () => {
   // const URL = "http://localhost:5000/";
    const [tasks, setTasks] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "finished"];
    const [error, setError] = useState(false);
    const URL = "http://localhost:3000/tasks";

    useEffect(() => {
        setIsLoading(true);
        const getTasks = async (url) => {
            try {
                const res = await fetch(url, {
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
            getTasks(URL);
        }, 600);
    }, [URL])
    

    const createTask = (newTask)=>{
        delete newTask.id;
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
                console.log(res);
                return res.json();
            })
                .then((taskEdited) => {
                    console.log(taskEdited);
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
                        editedTask={toEdit}
                        setToEdit={setToEdit}
                    />
            }
            {
                isLoading || error ? (<div className="centered"><Loader /></div>) :
                    <Table
                        title="To-Do List"
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

export default Crud