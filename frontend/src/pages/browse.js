import React from 'react';
import DelayLink from 'react-delay-link';
import {useStores} from "../models/RootStoreContext"


const Browse = () => {
  const {coloringFormStore, swanStore} = useStores();

  function loadColoringPage(model){
    if (model === "swan"){
      coloringFormStore.setPreload()
      coloringFormStore.preloadDefaultColor("#000000")
      coloringFormStore.setModel("swan", swanStore.wings)
      // set swan dimensions so SwanStore can do the calcs to getDimensions
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
    <DelayLink delay={0} to="/colouring" clickAction={loadColoringPage("swan")} replace={false}>
      <h1>Browse</h1>
    </DelayLink>
    </div>
  );
};

export default Browse;