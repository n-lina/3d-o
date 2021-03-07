import { types } from "mobx-state-tree";
import RowModel from './RowModel'

const DrawingSectionModel = types
  .model("DrawingSectionModel", {
    DrawingSectionData: types.optional(types.array(RowModel), [])
  })
  .actions(self => ({
  }))
  .actions(self => ({ 
  }))
  .views(self => ({
  }));

export default DrawingSectionModel;
