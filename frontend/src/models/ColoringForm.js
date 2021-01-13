import { types } from "mobx-state-tree";
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';

const fileType = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  PDF: 'application/pdf'
};

const DEFAULT_PNG = {
  fileName: 'component.png',
  type: fileType.PNG,
  html2CanvasOptions: {}
};

const saveAs = (uri, filename) => {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
      window.open(uri);
  }
};

const exportComponentBak = (node, {
  fileName, 
  type, 
  html2CanvasOptions, 
  pdfOptions
}) => {
  if(!node.current) {
      throw new Error("'node' must be a RefObject")
  }

  const element = ReactDOM.findDOMNode(node.current);
  return html2canvas(element, {
      scrollY: -window.scrollY,
      useCORS: true,
      ...html2CanvasOptions
  }).then(canvas => {
      console.log(canvas.toDataURL(type, 1.0))
      // saveAs(canvas.toDataURL(type, 1.0), fileName);
  });
};

const exportComponentAsPNG = (node, parameters = {}) => exportComponentBak(node, {...DEFAULT_PNG, ...parameters});

const ColoringForm = types
  .model("ColoringForm", {
    selectedColor: "#FF0000",
    defaultColor: "#FFFFFF",
    oldDefault: "#FFFFFF",
    clear: false,
    mode: false,
    maxWidth: 53,
    makeTexture: false,
    vaseTextureStore: types.optional(types.array(types.string), ["top", "", "", "bottom","extra"]),
    canvasPic: "",
  })
  .actions(self => ({
    storePic(picData, sectionNum){
      if (sectionNum == 100) {
        self.canvasPic = picData
        return
      }
      else {
        self.vaseTextureStore[sectionNum] = picData
        // console.log(picData)
      }
    }
  }))
  .actions(self => ({ 
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
    exportComponent (node, sectionNum) {
      if(!node.current) {
          throw new Error("'node' must be a RefObject")
      }
      const element = ReactDOM.findDOMNode(node.current);
      return html2canvas(element, {
          scrollY: -window.scrollY,
          useCORS: true,
          // ...html2CanvasOptions
          imageTimeout: 0,
          backgroundColor: sectionNum != 100? self.defaultColor : "#FFFFFF"
      }).then(canvas => {
          self.storePic(canvas.toDataURL(DEFAULT_PNG, 0.1), sectionNum)
      });
    },
    saveDiagram () {
      saveAs(self.canvasPic, "my-3do-diagram")
    },
  }))
  .views(self => ({
    // status() {
    //   return self.is_paid ? "Paid" : "Not Paid";
    // }
  }));

export default ColoringForm;
