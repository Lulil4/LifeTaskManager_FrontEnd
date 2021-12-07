import {React, useState, useEffect} from 'react'
import Table from './Table'
import Loader from './Loader'
import Form from './Form'
import '../App.css'

const Crud = () => {
   // const URL = "http://localhost:5000/";
    const [items, setItems] = useState([]);
    const [toEdit, setToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const columnNames = ["id", "description", "finished"];

    useEffect(() => {
        setItems(    [
            {
                "id":1,
                "description":"Buy groceries",
                "finished":true
            },
            {
                "id":2,
                "description":"Prepare weekly report",
                "finished":false
            },
            {
                "id":3,
                "description":"Write to candidates",
                "finished":true
            }
        ]);
    }, [])
    

    const createTask = (newTask)=>{
        alert("CREATE");
        console.log(newTask);

    };

    const updateTask = (taskUpdated)=>{
        alert("EDIT");
        console.log(taskUpdated);

    };

    const deleteTask = (id)=>{
        alert("REMOVE");
        console.log(id);
 
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
                data={items}
                setToEdit={setToEdit}
                deleteItem={deleteTask}
                updateItem={updateTask}
                columnNames={columnNames}/>)
            }
            
        </>
    )
}

export default Crud