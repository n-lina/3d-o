import { types } from "mobx-state-tree";
import RowModel from './RowModel'

const DrawingSectionModel = types
  .model("DrawingSectionModel", {
    drawingSectionData: types.optional(types.array(RowModel), []),
    width: 0, 
    height: 0, 
    increasing: false
  })
  .actions(self => ({
    addRow(){
      self.drawingSectionData.push(RowModel.create())
    }, 
    setWidthHeight(w, h){
      self.width = w
      self.height = h 
    }, 
    setIncreasing(val){
      self.increasing = val
    }
  }))
  .views(self => ({
  }));

export default DrawingSectionModel;
