import React, { Component } from "react";
import { observer } from "mobx-react";
// import InvoiceItem from "./InvoiceItem";
import Navbar from "./Navbar"
import '../App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages';
import Colouring from '../pages/colouring'

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
      <div style={{background: "#FFE7E5"}}>
          <Router>
            {/* <Navbar/> */}
            <Switch>
              <Route path='/colouring'>
                <Colouring />
              </Route>
              <Route path='/'>
                <Home/>
              </Route>
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
    );
  }
}

export default observer(App);
