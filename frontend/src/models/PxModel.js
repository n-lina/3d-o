import { types } from "mobx-state-tree";

const PxModel = types
  .model("PxModel", {
    pixelColor: "#FFFFFF", 
    oldColor: "#FFFFFF", 
    canChangeColor: true
  })
  .actions(self => ({
    setPxColor(col){
      self.pixelColor = col
    }, 
    setOldColor(col){
      self.oldColor = col
    }, 
    setCanChangeCol(val){
      self.canChangeColor = val
    }
  }))
  .views(self => ({
  }));

export default PxModel;
