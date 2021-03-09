import { types } from "mobx-state-tree";

const PxModel = types
  .model("PxModel", {
    pixelColor: "#FFFFFF", 
    oldColor: "#FFFFFF", 
    canChangeColor: true, 
    inverted: false
  })
  .actions(self => ({
    setPixelColor(col){
      self.pixelColor = col
    }, 
    setOldColor(col){
      self.oldColor = col
    }, 
    setCanChangeColor(val){
      self.canChangeColor = val
    }, 
    setInverted(val=true){
      self.inverted = val
    }
  }))
  .views(self => ({
  }));

export default PxModel;
