import { React, useState } from 'react'
import CrudFolders from '../components/folder/CrudFolders';
import CrudTasks from '../components/task/CrudTasks';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import Loader from '../components/general/loader/Loader';
import NavBar from '../components/general/NavBar';
import jwt_decode from "jwt-decode";

const initialForm = {
  id: null,
  username: "",
  password: ""
}

const HomePage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [toRegister, setToRegister] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { username, password } = form;
  const [isLoading, setIsLoading] = useState(false);
  const URL_LOGIN = "https://back-lifetaskmanager.herokuapp.com/users/login";
  const URL_REGISTER = "https://back-lifetaskmanager.herokuapp.com/users";
  const [user, setUser] = useState(null);
  const [customErrorMessage, setcustomErrorMessage] = useState(null);

  const handleViewRegister = () => {
    toRegister ? setToRegister(false) : setToRegister(true);
    setcustomErrorMessage(null);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(username + " " + password);
    if (!(username && password)) {
      setcustomErrorMessage("Please, fill all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      fetch(URL_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
        .then((retorno) => {
          if (retorno === undefined) {
            setcustomErrorMessage("Wrong username or password");
            return;
          }
          const { newToken } = retorno;
          window.localStorage.setItem("token", newToken);
          var {id} = jwt_decode(newToken);
          setUser(id);
          setToken(true);

        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading(false);
          setForm(initialForm);
        });
    }, 500);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (!(username && password)) {
      setcustomErrorMessage("Please, fill all fields");
      return;
    }
    else if(password.length < 7){
      setcustomErrorMessage("Please, choose a longer password.");
      return;
    }
    else if(username.length>50){
      setcustomErrorMessage("Please, choose a shorter username.");
    }
    else if(password.length>50){
      setcustomErrorMessage("Please, choose a shorter password.");
    }

    setIsLoading(true);

    setTimeout(() => {
      fetch(URL_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }).then((res) => {
        if (res.status == 500) {
          setcustomErrorMessage("Username taken. Please, choose another.");
          throw Error("Username taken");
        }
        if (res.ok) {
          return res.json();
        }
      })
        .then((retorno) => {
          setcustomErrorMessage("Now you can log in!");
          setToRegister(false);
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => {
          setIsLoading(false);
          setForm(initialForm);
        });
    }, 500);
  }

  const handleFormChange = ({ target }) => {
    setForm(() => {
      return {
        ...form,
        [target.name]: target.value
      }
    });
  }
  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload(true)
  }

  return (
    <>
      <NavBar message="Life Task Manager" handleLogout={logout}></NavBar>
      <div className="App">
        {
          token ?
            selectedFolder ?
              <>
                <CrudTasks selectedFolder={selectedFolder} />
                <div className="centered">
                  <button className="button is-primary" onClick={() => { setSelectedFolder(null) }}>Back to folders</button>
                </div></>
              : <CrudFolders setSelectedFolder={setSelectedFolder} userId={user} />

            : toRegister ? isLoading ? <Loader /> : <>
              <Register handleChange={handleFormChange} handleSubmit={handleRegister} customErrorMessage={customErrorMessage} />
              <div className="centered" style={{ marginTop: "5px" }}>
                <button onClick={handleViewRegister} className="button is-primary">Back to Login</button>
              </div>
            </>
              : isLoading ? <Loader /> : <>
                <Login handleChange={handleFormChange} handleSubmit={handleLoginSubmit} customErrorMessage={customErrorMessage} />
                <div className="centered" style={{ marginTop: "5px" }}>
                  <button onClick={handleViewRegister} className="button is-primary">Don't have an account?</button>
                </div>
              </>
        }

      </div>
    </>
  );
}

export default HomePage