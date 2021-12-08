import { React, useState } from 'react'

const FolderRow = ({ folder, setToEdit, deleteFolder, setSelectedFolder}) => {
    const { id, description, userId} = folder;
    
    return (
        <tr>
            <td><div className="preventLongDescription">{description}</div></td>
            <td>
                <div className="centeredButtons">
                    <button className="leftButton button is-primary" onClick={() => { setSelectedFolder(folder) }}>View Tasks</button>
                    <button className="leftButton button is-warning" onClick={() => { setToEdit(folder) }}>Edit</button>
                    <button className="rightButton button is-danger" onClick={() => { deleteFolder(folder)}}>Remove </button>
                </div>
            </td>
        </tr>
    )
}

export default FolderRow