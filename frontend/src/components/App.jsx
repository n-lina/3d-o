import React, { Component } from "react";
import { observer } from "mobx-react";
import InvoiceItem from "./InvoiceItem";
import Navbar from "./Navbar"
import '../App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages';
import About from '../pages/about';
import Learn from '../pages/services';
import Contact from '../pages/contact';
import Create from '../pages/signup';
import Gallery from '../pages/signup';

class App extends Component {
  render() {
    const { invoice } = this.props;

    return (
      <div className="Background">
        <div className="InnerApp">
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
            <Route path='/services' component={Learn} />
            <Route path='/contact-us' component={Contact} />
            <Route path='/sign-up' component={Gallery} />
            <Route path='/sign-up' component={Create} />
          </Switch>
        </Router>
          <h1>Status: {invoice.status()}</h1>

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
          </ul>
        </div>
      </div>
    );
  }
}

export default observer(App);
