import { types } from "mobx-state-tree";

const ColoringForm = types
  .model("ColoringForm", {
    selectedColor: "#F44336",
    defaultColor: "#FFFFFF",
    oldDefault: "#FFFFFF",
    clear: false,
    mode: false,
    maxWidth: 53
  })
  .actions(self => ({
    getDimensions() {
      self.maxWidth = 28
      return [[20, 19],[21,10],[28,9], [16,10]]
    }, 
    setColor(col){
      self.clear = false
      self.selectedColor = col
    }, 
    setDefaultColor(col){
      self.clear = false
      self.oldDefault = self.defaultColor
      self.defaultColor = col
    },
    clearAll(){
      if (self.defaultColor == "#FFFFFF"){
        self.oldDefault = "#FFFFFE" 
        self.defaultColor = "#FFFFFE"
      }
      else {
        self.oldDefault = "#FFFFFF" 
        self.defaultColor = "#FFFFFF"
      }
      self.clear = true
    }, 
    unsetClear(){
      self.clear = false
    },
    setMode(val){
      self.clear = false
      self.mode = val
    }
  }))
  .views(self => ({
    // status() {
    //   return self.is_paid ? "Paid" : "Not Paid";
    // }
  }));

export default ColoringForm;
