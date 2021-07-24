import React from 'react';
import Navbar from '../components/Navbar';
import Landing from './landing';
import About from './about';
import Learn from './learn';
import Contact from './contact';
import Create from './create';
import Gallery from './gallery';
import Browse from './browse';
import Login from './login';
import CreateSwan from "./create-swan"
import CreateVase from "./create-vase"
import CreateBasket from "./create-basket"
import CreateFigurine from "./create-figurine"
import Result from "./result"
import { Switch, Route, Redirect } from 'react-router-dom';
import { useStores } from "../models/RootStoreContext"

const Home = () => {

  const {coloringFormStore} = useStores();

  return (
  <div className="Background">
    <div className="InnerApp"> 
      <Navbar/>
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/create' component={Create} />
        <Route path='/learn' component={Learn} />
        <Route path='/contact' component={Contact} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/browse' component={Browse} />
        <Route path='/login' component={Login} />
        <Route path='/create-swan' component={CreateSwan} />
        <Route path='/create-vase' component={CreateVase} />
        <Route path='/create-basket' component={CreateBasket} />
        <Route path='/create-figurine' component={CreateFigurine} />
        <Route path='/result'>
          {coloringFormStore.resultMsg === "error" ? <Redirect to="/create"/> : <Result />}
        </Route>
        <Route path='/' component={Landing}/>
      </Switch>
    </div>
    <p style={{marginBottom: 30, marginTop: 20, letterSpacing: 1.5, color: "#E33937", fontSize:13}}>lina nguyen 🍓 2021</p>
  </div>
  );
};

export default Home;
