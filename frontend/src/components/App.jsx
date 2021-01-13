import React, { Component } from "react";
import { observer } from "mobx-react";
import '../App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages';
import Colouring from '../pages/colouring'
// import makeInspectable from "mobx-devtools-mst";
import RootStore from "../models/RootStore";
import {RootStoreProvider} from "../models/RootStoreContext"


const rootStore = RootStore.create()

// makeInspectable(vase);

class App extends Component {
  render() {
    return (
      <div style={{background: "#FFE7E5"}}>
        <RootStoreProvider value={rootStore}>
          <Router>
            <Switch>
              <Route path='/colouring'>
                <Colouring />
              </Route>
              <Route path='/'>
                <Home/>
              </Route>
            </Switch>
          </Router>
        </RootStoreProvider>
      </div>
    );
  }
}

export default observer(App);
