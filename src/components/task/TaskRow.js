import { React, useState } from 'react'

const TaskRow = ({ item, setToEdit, deleteItem, updateItem}) => {
    const { id, description, folderId, finished } = item;
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
            <td>
            {
                folderId? <input type="checkbox" name="finished" onChange={handleChange} checked={isFinished} /> : <></>
            }
            </td>
            <td className="preventLongDescription">{description}</td>
            <td>
                <div className="centeredButtons">
                    <button className="leftButton button is-warning" onClick={() => { setToEdit(item) }}>Edit</button>
                    <button className="rightButton button is-danger" onClick={() => { deleteItem(id) }}>Remove </button>
                </div>
            </td>
        </tr>
    )
}

export default TaskRow