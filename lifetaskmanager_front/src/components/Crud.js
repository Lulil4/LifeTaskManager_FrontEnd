import {React, useState, useEffect} from 'react'
import Table from './Table'
import Loader from './Loader'
import Form from './Form'
import '../App.css'

const Crud = () => {
   // const URL = "http://localhost:5000/";
    const [tasks, setTasks] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "finished"];
    const URL = "http://localhost:3000/tasks";

    useEffect(() => {

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
                console.error(error.message);
            }
        }
        getTasks(URL);
    }, [])
    

    const createTask = (newTask)=>{
        delete newTask.id;
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              //  "authorization": JSON.stringify(token)
            },
            body: JSON.stringify(newTask)
        }).then(res => res.json())
        .then(newTask => setTasks([...tasks, newTask]));

    };

    const updateTask = (taskUpdated) => {
        fetch(URL + taskUpdated.id, {
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
        alert("EDITED! TEST MESSAGE");
        console.log(taskUpdated);

    };

    const deleteTask = (id)=>{
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
        })
    };
    
    return (
        <>
            <Form className="form"
            create={createTask}
            update={updateTask}
            editedTask={toEdit}
            setToEdit={setToEdit}
            />
           
            {
                isLoading? (<Loader/>) : 
                (<Table 
                title="To-Do List"
                emptyMessage="Hurray! There are no tasks :)"
                data={tasks}
                setToEdit={setToEdit}
                deleteItem={deleteTask}
                updateItem={updateTask}
                columnNames={columnNames}/>)
            }
            
        </>
    )
}

export default Crud