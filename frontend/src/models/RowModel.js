import { types } from "mobx-state-tree";
import PxModel from './PxModel'

const RowModel = types
  .model("RowModel", {
    rowData: types.optional(types.array(PxModel), []),
    offset: false
  })
  .actions(self => ({
    addPx(){
      self.rowData.push(PxModel.create())
    },
    setOffset(){
      self.offset = true
    }
  }))
  .actions(self => ({ 
  }))
  .views(self => ({
  }));

export default RowModel;
