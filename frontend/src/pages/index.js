import React, {useState} from 'react';
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
import '../App.css'
import { firestore } from '../firebase';

const Home = () => {

  const {coloringFormStore} = useStores();
  const [diagram_num, set_diagram_num] = useState("");

  const docRef = firestore.collection("diagrams_count").doc("count")

  docRef.get().then((doc) => {
    // Document was found in the cache. If no cached document exists,
    // an error will be returned to the 'catch' block below.
    set_diagram_num(doc.data().count_value)
  }).catch((error) => {
    console.log("Error getting cached document:", error);
  });

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
    <p className="generated-count"><span>{diagram_num}</span> 3d-o diagram{diagram_num == 1?"":"s"} generated to date ...</p>
    <p className="bottom-name">Lina Nguyen 🍓 2021</p>
  </div>
  );
};

export default Home;
