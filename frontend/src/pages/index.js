import React from 'react';
import Navbar from '../components/Navbar';

import Landing from './landing';
import About from './about';
import Learn from './learn';
import Contact from './contact';
import Create from './create';
import Gallery from './gallery';
import Browse from './browse';
import CreateSwan from "./create-swan"
import CreateVase from "./create-vase"
import CreateBasket from "./create-basket"
import CreateFigurine from "./create-figurine"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Home = () => {
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
        <Route path='/create-swan' component={CreateSwan} />
        <Route path='/create-vase' component={CreateVase} />
        <Route path='/create-basket' component={CreateBasket} />
        <Route path='/create-figurine' component={CreateFigurine} />
        <Route path='/' component={Landing}/>
      </Switch>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh'
        }}
      >
        <h1>Home</h1>
      </div> */}
    </div>
  </div>
  );
};

export default Home;
