import { types } from "mobx-state-tree";
import RowModel from './RowModel'

const DrawingSectionModel = types
  .model("DrawingSectionModel", {
    drawingSectionData: types.optional(types.array(RowModel), [])
  })
  .actions(self => ({
    addRow(){
      self.drawingSectionData.push(RowModel.create())
    }
  }))
  .actions(self => ({ 
  }))
  .views(self => ({
  }));

export default DrawingSectionModel;
