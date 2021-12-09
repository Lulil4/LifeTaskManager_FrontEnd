import React from 'react'
import FolderRow from './FolderRow'
import TaskRow from './TaskRow'

const Table = ({title, emptyMessage, data, setToEdit, deleteItem, updateItem, setSelectedFolder}) => {
    return (
        <>
        <hr className="is-divider"/>
        <h2 className="preventLongDescription fixedWidth spacedUpAndDown title is-4 ">{title}</h2>
        <table className="table centered fixedWidth">
                <tbody>
                {
                   data.length ? (data.map(item=> 
                   data[0].userId? <FolderRow key={item.id} folder={item} setToEdit={setToEdit} deleteFolder={deleteItem} setSelectedFolder={setSelectedFolder}/>
                   : <TaskRow key={item.id} item={item} setToEdit={setToEdit} deleteItem={deleteItem} updateItem={updateItem}/>
                   
                   )) 
                   
                   : <tr><td>{emptyMessage}</td></tr>
                }
                </tbody>
        </table>
        </>
    )
}

export default Table