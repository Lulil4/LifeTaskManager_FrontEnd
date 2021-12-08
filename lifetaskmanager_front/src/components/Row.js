import { React, useState } from 'react'

const Row = ({ item, setToEdit, deleteItem, updateItem }) => {
    const { id, description, finished } = item;
    const [isFinished, setIsFinished] = useState(finished);

    const handleChange = ({ target }) => {
        const { name } = target;
        if (name === "finished") {
            target.checked ? setIsFinished(true) : setIsFinished(false);
            item.finished = !isFinished;
            updateItem(item);
        }
    }

    return (
        <tr>
            <td><input type="checkbox" name="finished" onChange={handleChange} checked={isFinished} /></td>
            <td><div className="preventLongDescription">{description}</div></td>
            <td>
                <div className="centeredButtons">
                    <button className="leftButton button is-warning" onClick={() => { setToEdit(item) }}>Edit</button>
                    <button className="rightButton button is-danger" onClick={() => { deleteItem(id) }}>Remove </button>
                </div>
            </td>
        </tr>
    )
}

export default Row