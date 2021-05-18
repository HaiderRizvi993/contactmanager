//import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/layout/Header';
import NotFound from './components/404';
import Contacts from "./components/contacts/Contacts";
import AddContact from "./components/contacts/AddContact";
import About from "./components/About";
import {Provider} from './context';
import EditContact from "./components/contacts/EditContact";


function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header branding="Contact Manager"/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Contacts}/>
              <Route exact path="/contact/add" component={AddContact}/>
              <Route exact path="/contact/edit/:id" component={EditContact} />
              <Route exact path="/about" component={About}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
    </Router>
    </Provider>
  );
}

export default App;