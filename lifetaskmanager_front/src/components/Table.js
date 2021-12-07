import React from 'react'
import Row from './Row'

const Table = ({title, emptyMessage, data, setToEdit, deleteItem, updateItem}) => {
    return (
        <>
        <hr className="is-divider"/>
        <h2 className="centered spacedUpAndDown title is-4">{title}</h2>
        <table className="table">
                <tbody>
                {
                   data.length ? (data.map(item=> <Row key={item.id} item={item} setToEdit={setToEdit} deleteItem={deleteItem} updateItem={updateItem}/>)) : <tr><td>{emptyMessage}</td></tr>
                }
                </tbody>
        </table>
        </>
    )
}

export default Table