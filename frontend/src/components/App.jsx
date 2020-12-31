import React, { Component } from "react";
import { observer } from "mobx-react";
import InvoiceItem from "./InvoiceItem";
import Navbar from "./Navbar"
import '../App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages';
import About from '../pages/about';
import Learn from '../pages/learn';
import Contact from '../pages/contact';
import Create from '../pages/create';
import Gallery from '../pages/gallery';
import Browse from '../pages/browse';
import Colouring from '../pages/colouring'
import CreateSwan from "../pages/create-swan"
import CreateVase from "../pages/create-vase"
import CreateBasket from "../pages/create-basket"
import CreateFigurine from "../pages/create-figurine"

import { onPatch } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import Invoice from "../models/Invoice";

const invoice = Invoice.create({ currency: "CAD" });

onPatch(invoice, patch => {
  console.log(patch);
});
makeInspectable(invoice);

class App extends Component {
  render() {
    // const { invoice } = this.props;

    return (
      <div className="Background">
        <div className="InnerApp">
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
              <Route path='/colouring' component={Colouring} />
              <Route path='/create-swan' component={CreateSwan} />
              <Route path='/create-vase' component={CreateVase} />
              <Route path='/create-basket' component={CreateBasket} />
              <Route path='/create-figurine' component={CreateFigurine} />
            </Switch>
          </Router>
          {/* <h1>Status: {invoice.status()}</h1>

          {!invoice.is_paid && (
            <button
              onClick={e => {
                e.preventDefault();
                invoice.markPaid();
              }}
            >
              Pay
            </button>
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              invoice.itemList.add({
                quantity: this.quantityInput.value,
                name: this.nameInput.value,
                price: this.priceInput.value
              });
              e.target.reset();
              this.nameInput.focus();
            }}
          >
            <label>
              Name
              <input ref={input => (this.nameInput = input)} />
            </label>

            <label>
              Quantity
              <input ref={input => (this.quantityInput = input)} />
            </label>

            <label>
              Price
              <input ref={input => (this.priceInput = input)} />
            </label>

            <button type="submit">Add</button>
          </form>

          <strong>Total Cost ${invoice.itemList.total().toFixed(2)}</strong>

          <ul>
            {invoice.itemList.items.map((item, i) => (
              <InvoiceItem key={i} item={item} />
            ))}
          </ul> */}
        </div>
      </div>
    );
  }
}

export default observer(App);
