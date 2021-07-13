import { types } from "mobx-state-tree";
import * as THREE from "three";
import React from "react"

function getCurvePointsSwan(_pts, tension, numOfSegments) {

    var res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    const first_x = _pts[0]
    const first_y = _pts[1]
    const last_x = _pts[4]
    const last_y = _pts[5]

    _pts.unshift(first_y)
    _pts.unshift(first_x)
    _pts.push(last_x)
    _pts.push(last_y)

    for (i=2; i < (_pts.length - 4); i+=2) {
        for (t=0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i+2] - _pts[i-2]) * tension;
            t2x = (_pts[i+4] - _pts[i]) * tension;

            t1y = (_pts[i+3] - _pts[i-1]) * tension;
            t2y = (_pts[i+5] - _pts[i+1]) * tension;

            // calc step
            st = t / numOfSegments;

            // calc cardinals
            c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
            c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
            c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

            // calc x and y cords with common control vectors
            x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

            //store points in array
            res.push(x);
            res.push(Math.max(0.5, y));

        }
    }
    return res;
}

const SwanStore = types
  .model("Swan", {
    maxWidth: 0,
    cm: true,
    diameter: 16,
    body_height: 0.35,
    top_scale: 1,
    bottom_scale:0.6, 
    height_scale: 0.4,
    default_color: "#FFFFFF", 
    wings: true, // true = two wings
    bottom_rim: true,
    texture: "", 
    modelDimensions: types.optional(types.array(types.array(types.number)), [[8, 2]]), // top to bottom, only one element
    // unused, only for consistency: 
    flat_bottom: false,
    top_rim: false, 
    arms: false, 
    ears: "", 
    lid: false, 
    top_handle: false, 
    side_handles: false, 
  })
  .actions(self => ({
    in_to_cm(){
        const conv = 2.54
        self.diameter = Math.round(self.diameter * conv)
        self.cm = true
    },
    cm_to_in(){
        const conv = 2.54
        self.diameter = Math.round(self.diameter / conv)
        self.cm = false
    },
    update_units(units){
        if (self.cm == units) return 
        // changing from in to cm
        if (self.cm == false && units == true){
            self.in_to_cm()
        }
        // changing from cm to in
        else{
            self.cm_to_in()
        }
        self.cm = units
    },
    update_wings(val){
        self.wings = val
    },
    update_bottom_rim(val){
        self.bottom_rim = val
    },
    update_diameter(d){
        self.diameter = d
    }, 
    storePic(picData){
        self.texture = picData
    },
    clearTextures(){
        self.texture = ""
    },
    setDefaultColor(color){
        self.default_color = color
    },
    cmToPcs(cm, height=false){
        const height_factor = 0.55 // 0.5 cm height per row
        const width_factor = 0.8 // 0.8 cm width per pc
        if (height){
            return Math.round(cm/height_factor)
        }
        return Math.round(cm/width_factor)
    },
    getDimensions() {
        // INPUTS 
        // diameter: 30,

        // OUTPUTS
        // modelDimensions: types.optional(types.array(types.array(types.number)), [[43, 10]]

        // convert from in to cm first 
        let diameter = self.diameter

        if (!self.cm) {
            const conv = 2.54
            diameter = Math.round(self.diameter * conv)
        }

        const height_input = 1.8 * diameter * self.height_scale // 1.8 is from the height of the swan model in swanBodyPts()

        const circ_pcs = self.cmToPcs(Math.PI * diameter)
        const height = self.cmToPcs(height_input, true)
        const modelDimensions = [[circ_pcs, height]]
        
        self.maxWidth = circ_pcs
        self.modelDimensions = modelDimensions
        return modelDimensions
    },
    swanBodyPts(){
        let display_diameter = self.diameter
        if (!self.cm){
            display_diameter = Math.round(display_diameter * 2.54)
        }
        const s_dtop_h = display_diameter * self.height_scale
        const s_dbottom_h = -1 * s_dtop_h * 0.8

        const s_bottom = display_diameter * self.bottom_scale
        const s_top = display_diameter * self.top_scale

        const s_diameter = display_diameter
        const s_diameter_h = 0

        var myPoints = [s_dbottom_h,s_bottom/2, s_diameter_h,s_diameter/2, s_dtop_h,s_top/2]; 
        var tension = 0.65
        var numOfSegments = 10
        let points = [];
        const new_pts = getCurvePointsSwan(myPoints, tension, numOfSegments)
        for (let i=0; i<new_pts.length; i+=2){
            const h = new_pts[i]
            const r = new_pts[i+1]
            points.push( new THREE.Vector2(r, h));
        }
        return points
    }
  }))
  .views(self => ({
  }));

export default SwanStore;

const SwanContext = React.createContext();

export const SwanProvider = ({ children, store }) => {
    return (
      <SwanContext.Provider value={store}>{children}</SwanContext.Provider>
    );
  };

export const useSwanStore = () => React.useContext(SwanContext);

export const withSwanStore = (Component) => (props) => {
    return <Component {...props} store={useSwanStore()} />;
  };