
import ChatWindow from './components/ChatWindow';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LogIn from './components/LogIn';
import NewTimer from './components/NewTimer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id/:nickname/:email" exact>
          <ChatWindow />
        </Route>

        <Route path="/:id/" exact>
          <LogIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
