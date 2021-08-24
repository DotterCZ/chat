
import ChatWindow from './components/ChatWindow';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id/:email" exact>
          <ChatWindow />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
