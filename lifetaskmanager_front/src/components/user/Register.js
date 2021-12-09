import { React } from 'react';

const Register = ({ handleChange, handleSubmit, username, password, customErrorMessage }) => {

    return (
        <>
            <h1 className="title is-2 centered">Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    value={username}
                    onChange={handleChange}
                    className="input is-rounded"
                    style={{ "marginBottom": "1vh" }} />

                <input type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={password}
                    onChange={handleChange}
                    className="input is-rounded"
                    style={{ "marginBottom": "3vh" }} />
                <div className="centered">
                    {
                        customErrorMessage && <h1 className="centered title is-6">{customErrorMessage}</h1>
                    }
                    <input className="button is-success" style={{ "marginTop": "5%" }} type="submit" value="Register" />
                </div>
            </form>
        </>
    )
}

export default Register