import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../../pages';
import About from '../../pages/about';
import Learn from '../../pages/learn';
import Contact from '../../pages/contact';
import Create from '../../pages/create';
import Gallery from '../../pages/gallery';
import Browse from '../../pages/browse';
import CreateSwan from "../../pages/create-swan"
import CreateVase from "../../pages/create-vase"
import CreateBasket from "../../pages/create-basket"
import CreateFigurine from "../../pages/create-figurine"
import Navbar from "../Navbar"

const myRouter = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
            <Route path='/' exact component={Home} />
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
        </Switch>
      </Router>
    </>
  );
};

export default myRouter;