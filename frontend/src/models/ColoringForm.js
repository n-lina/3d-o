import { types } from "mobx-state-tree";

const ColoringForm = types
  .model("ColoringForm", {
    selectedColor: "#F44336",
    defaultColor: "#FFFFFF",
    oldDefault: "#FFFFFF",
    clearAll: false,
    maxWidth: 53

    // undoStack: types.optional(types.array(types.array(types.string)), [["selected","",""]]),
    // redoStack: types.optional(types.array(types.array(types.string)), [["selected","",""]]),
    // sections: types.optional(types.array(ColoringSection), [])
  })
  .actions(self => ({
    getDimensions() {
      self.maxWidth = 28
      return [[20, 19],[21,10],[28,9], [16,10]]
    }, 
    setColor(col){
      self.selectedColor = col
    }, 
    setDefaultColor(col){
      self.oldDefault = self.defaultColor
      self.defaultColor = col
    },
    undo(op){
      return
    },
    redo(op){
      return
    },
    clearAll(val){
      self.clearAll = val
    }, 
  }))
  .views(self => ({
    // status() {
    //   return self.is_paid ? "Paid" : "Not Paid";
    // }
  }));

export default ColoringForm;
