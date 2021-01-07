import { types } from "mobx-state-tree";

const ColoringForm = types
  .model("ColoringForm", {
    // selectedColor: "#F44336",
    selectedColor: "#FF0000",
    defaultColor: "#FFFFFF",
    oldDefault: "#FFFFFF",
    clear: false,
    mode: false,
    maxWidth: 53, 
    makeTexture: false,
    endColors: types.optional(types.array(types.array(types.string)), [])
  })
  .actions(self => ({
    getDimensions() {
      self.maxWidth = 53
      return [[53, 10],[40,10],[28,9], [16,10]]
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
    }, 
    setMakeTexture(val){
      self.makeTexture = val
    }, 
    saveColor(sectionNum, rowNum, color){
      if (self.endColors.length > sectionNum){
        if (self.endColors[sectionNum].length > rowNum){ // section and row already exist 
          self.endColors[sectionNum][rowNum] = color
        }
        else{ // adding a new row
          self.endColors[sectionNum].push(color)
        }
      }
      else { // creating a new section
        self.endColors.push([color])
      }
    }
  }))
  .views(self => ({
    // status() {
    //   return self.is_paid ? "Paid" : "Not Paid";
    // }
  }));

export default ColoringForm;
