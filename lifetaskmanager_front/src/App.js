import './App.css';
import 'bulma/css/bulma.css';
import Title from './components/Title';
import HomePage from './pages/HomePage';
import Error404Page from './pages/Error404Page';
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="centered">
      <Title title="Life Task Manager"></Title>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="*" component={Error404Page} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
