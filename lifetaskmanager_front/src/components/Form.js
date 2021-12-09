import { React, useState, useEffect } from 'react'

const initialForm = {
    id: null,
    description: "",
    finished: false,
    userId: null,
    folderId:null
}

const Form = ({ create, update, editedItem, setToEdit, itemName, selectedFolderId}) => {
    const [form, setForm] = useState(initialForm);
    const {id, description, finished, userId, folderId} = form;
    const [oldDescription, setOldDescription] = useState("");

    useEffect(() => {
        if (editedItem) {
            setForm(editedItem);
            setOldDescription(`"` + editedItem.description + `"`);
        }
        else{
            setForm(() => {
                return {
                    ...form,
                    folderId: selectedFolderId
                }
            });
        }
    }, [editedItem])

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
        else if(description.length > 99){
            alert("Too long! Maybe you should atomize");
            return;
        }

        if (!id) {
            create(form);
        }
        else {
            update(form);
        }

        handleReset();
    }

    const handleReset = (e) => {

        setToEdit(null);
        
        setForm(() => {
            return {
                ...initialForm,
                folderId: selectedFolderId
            }
        });

        console.log(form);
    }

    return (
        <>
        <div className="centered">
        <h2 className="centeredTitle spacedUpAndDown title is-5">{id ? `Editing ${itemName} ` + oldDescription: `Add ${itemName}`}</h2>
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
                {
                    id ? <input type="submit" className="leftButton button is-success" value="Edit" /> 
                    : <input type="submit" className="leftButton button is-success" value="Add" />
                }
                
                <input type="reset" className="rightButton button is-warning" value="Clear" onClick={handleReset} />
                </div> 
            </form>
        </>
    )
}

export default Form