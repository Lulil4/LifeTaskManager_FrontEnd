import React, { useEffect, useState } from 'react';

const NavBar = ({ message, handleLogout }) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        setToken(window.localStorage.getItem("token"))
    }, []);

    return (
        <div className="navBar">
            <h1 className="title is-6 navbarMessage" >{message}</h1>

            <div className="divToRight">
            {
                token ?
                    <button className="button is-danger" style={{ alignSelf: "right" }} onClick={handleLogout}>
                        Log out
                    </button> : <></>
            }
            </div>
           
        </div>
    );
}

export default NavBar;