import { types } from "mobx-state-tree";
import PxModel from './PxModel'

const RowModel = types
  .model("RowModel", {
    RowData: types.optional(types.array(PxModel), [])
  })
  .actions(self => ({
  }))
  .actions(self => ({ 
  }))
  .views(self => ({
  }));

export default RowModel;
