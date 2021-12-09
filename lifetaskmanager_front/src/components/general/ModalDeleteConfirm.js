import React from 'react'

const ModalDeleteConfirm = ({ message, handleYes, handleNo, item }) => {

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title centeredText">Delete Folder</p>
                </header>
                <section className="modal-card-body">
                    <h1 className="centeredText">{message}</h1>
                </section>
                <footer className="modal-card-foot centeredButtons" style={{justifyContent:"center"}}> 
                        <button className="button is-success" onClick={() => { handleYes(item) }}>Yes</button>
                        <button className="button" onClick={() => { handleNo() }}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default ModalDeleteConfirm