import { React, } from 'react'

const FolderRow = ({ folder, setToEdit, deleteFolder, setSelectedFolder }) => {
    const { id, description, userId } = folder;

    return (
        <tr>
            <td className="preventLongDescription">{description}</td>
            <td style={{verticalAlign:"middle"}}>
                <div className="centeredButtons"> 
                    <button className="leftButtonRow button is-primary" onClick={() => { setSelectedFolder(folder) }}>View Tasks</button>
                    <button className="rightButtonRow button is-danger" onClick={() => { deleteFolder(folder) }}>Remove </button>
                </div>
            </td>
        </tr>
    )
}

export default FolderRow