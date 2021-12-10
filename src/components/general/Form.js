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
     // eslint-disable-next-line no-unused-vars
    const {id, description, finished, userId, folderId} = form;
    const [oldDescription, setOldDescription] = useState("");
    const [customErrorMessage, setcustomErrorMessage] = useState(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editedItem, selectedFolderId])

    const handleChange = ({ target }) => {
        setcustomErrorMessage(null);
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
            setcustomErrorMessage("Please, fill all fields.");
            return;
        }
        else if(description.length > 249){
            setcustomErrorMessage("Too long! Maybe you should atomize");
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
        setcustomErrorMessage(null);
        setToEdit(null);
        
        setForm(() => {
            return {
                ...initialForm,
                folderId: selectedFolderId
            }
        });
    }

    return (
        <>
        <div className="centered">
        <h2 className="centeredTitle spacedUpAndDown title is-5">{id ? `Editing ${itemName} ` + oldDescription: `Add ${itemName}`}</h2>
        </div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="description"
                    placeholder={`New ${itemName}`}
                    autoComplete="off"
                    value={description}
                    onChange={handleChange} 
                    className="input is-warning"
                    />
                    {
                        customErrorMessage && <h1 className="centered title is-6">{customErrorMessage}</h1>
                    }
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