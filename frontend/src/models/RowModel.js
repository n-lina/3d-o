import { types } from "mobx-state-tree";
import PxModel from './PxModel'

const RowModel = types
  .model("RowModel", {
    rowData: types.optional(types.array(PxModel), []),
    offset: 0, 
    width: 0, 
    displayRowNum: 0,
  })
  .actions(self => ({
    addPx(){
      self.rowData.push(PxModel.create())
    },
    setOffset(val = 10.5){
      self.offset = val
    }, 
    setWidth(val){
      self.width = val
    }, 
    setDisplayRowNum(val){
      self.displayRowNum = val
    }
  }))
  .actions(self => ({ 
  }))
  .views(self => ({
  }));

export default RowModel;
