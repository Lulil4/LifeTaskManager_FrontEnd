import React from 'react';

const Login = ({ handleSubmit, handleChange, username, password, customErrorMessage }) => {

    return (
        <div className="form" onSubmit={handleSubmit}>
             <h1 className="title is-2 centered">Login</h1>
            <form>
                <input type="text" className="input is-rounded" style={{ "marginBottom": "1vh" }} onChange={handleChange} name="username" value={username} placeholder="Username" />
                <input type="password" className="input is-rounded" style={{ "marginBottom": "3vh" }} onChange={handleChange} name="password" value={password} placeholder="Password" />
                <div className="centered">
        {
          customErrorMessage && <h1 className="centered title is-6">{customErrorMessage}</h1>
        }
                <input className="button is-success" type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
}

export default Login;