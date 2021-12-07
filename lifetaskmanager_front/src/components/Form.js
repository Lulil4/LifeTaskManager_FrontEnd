import { React, useState, useEffect } from 'react'

const initialForm = {
    id: null,
    description: ""
}

const Form = ({ create, update, editedTask, setToEdit }) => {
    const [form, setForm] = useState(initialForm);
    const { id, description} = form;
    const [oldDescription, setOldDescription] = useState("test");

    useEffect(() => {
        if (editedTask) {
            setForm(editedTask);
            setOldDescription(`"` + editedTask.description + `"`);
        }
    }, [editedTask])

    const handleChange = ({ target }) => {
            setForm(() => {
                return {
                    ...form,
                    [target.name]: target.value
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description) { 
            alert("Please, fill all fields.");
            return;
        }
        if (!id) {
            create(form);
            alert("Sending...");
        }
        else {
            update(form);
        }

        handleReset();
    }

    const handleReset = (e) => {
        setForm(initialForm);
        setToEdit(null);
    }

    return (
        <>
        <div className="centered">
        <h2 className="centeredTitle spacedUpAndDown title is-5">{id ? `Editing Task ` + oldDescription: "Add Task"}</h2>
        </div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="description"
                    placeholder="New Task"
                    autoComplete="off"
                    value={description}
                    onChange={handleChange} 
                    className="input is-warning"
                    />
                <div className="centeredButtons spacedUpAndDown">
                <input type="submit" className="leftButton button is-success" value="Enviar" />
                <input type="reset" className="rightButton button is-warning" value="Limpiar" onClick={handleReset} />
                </div> 
            </form>
        </>
    )
}

export default Form