import {types } from "mobx-state-tree";
import * as THREE from "three";
import React from "react"

function getCurvePointsFigurine(_pts, tension, numOfSegments) {

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

const FigurineStore = types
  .model("Figurine", {
    maxWidth: 0,
    cm: true,
    diameter: 13,
    arms: true, 
    ears: "bear", // bear, bunny, cat, sphere
    body_scale: 0.7,
    body_height: 0.35,
    default_color: "#FFFFFF",
    textures: types.optional(types.array(types.string), []), // first idx = top, last idx = bottom of vase
    tot_rows_head: 33,
    modelDimensions: types.optional(types.array(types.array(types.number)), [[30,12],[40,11],[53,10],[40,10]]), // last = body
    // unused, only for consistency: 
    flat_bottom: false, 
    top_rim: false, 
    bottom_rim: false, 
    lid: false, 
    top_handle: false, 
    side_handles: false, 
  })
  .actions(self => ({
    update_ears(val){
        self.ears = val
    },
    update_arms(val){
        self.arms = val
    },
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
    update_diameter(d){
        self.diameter = d
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

        // body 
        const height_input = self.body_height * diameter * 2 // 2 because diameter is in the middle of the section
        const diameter_pcs = self.cmToPcs(diameter)
        const height = self.cmToPcs(height_input, true)
        const body_dimensions = [diameter_pcs, height]
        console.log(body_dimensions)

        // head
        const theta_len = 0.8
        const head_start_theta_len = 0.85
        const goal_rad = (diameter * self.body_scale)/2 // all in cm
        const head_rad = goal_rad/Math.sin((1-theta_len) * Math.PI)
        console.log(2*head_rad, diameter)
        const head_circ = self.cmToPcs(Math.PI * head_rad * 2)
        const head_start_rad = head_rad * Math.sin((1-head_start_theta_len) * Math.PI)
        const head_start_circ = self.cmToPcs(Math.PI * head_start_rad * 2)
        const head_start_height = self.cmToPcs(head_rad * Math.sin((1-head_start_theta_len) * Math.PI), true)

        const widths = [head_start_circ, head_circ, Math.min(head_start_circ, 3)]
        const heights = [0,  head_start_height, head_start_height+self.cmToPcs(head_rad)]
        // let temp = self.getDimensionsHead(widths, heights) // call function here using this as input
        console.log("w", widths)
        console.log("h", heights)
        // console.log("temp", temp)
        let modelDimensions = [[diameter_pcs, height]]

        // together 
        self.maxWidth = self.cmToPcs(head_rad)
        modelDimensions.push(body_dimensions)
        self.modelDimensions = modelDimensions
        return modelDimensions
    },
    getDimensionsHead(widths, heights) {
        // INPUTS (cm)
        // dhead_start
        // dhead
        // dhead_end

        // OUTPUTS
        // modelDimensions: types.optional(types.array(types.array(types.number)), [[43, 10], [53, 10],[40,10],[28,9], [16,10], [24,5]]), // top to bottom

        // max allowed decrease rate: -1 per 5 pcs
        // max increase rate: +1 per 1 pc 
        // min 3 rows per section

        let modelDimensions = []
        // getting from diameter to diameter in 'height' pieces

        for (let i = 0; i < widths.length-1; i++){
            const min_height = 3
            let min_height_needed = min_height
            let diff = widths[i+1]-widths[i]
            let height_diff = heights[i+1] - heights[i]

            let temp_dbottom = widths[i]
            let curr_section = []
            
            // decreasing 
            if (diff > 0){
                curr_section.push([temp_dbottom,min_height])
                while (diff > 0){
                    const add_to_this_row = Math.floor(temp_dbottom/min_height)
                    const actual_add = Math.min(diff, add_to_this_row)
                    diff -= actual_add 
                    temp_dbottom += actual_add
                    if (diff == 0 && i < widths.length-2) break
                    min_height_needed += min_height
                    curr_section.unshift([temp_dbottom, min_height])
                }
            }
            // increasing
            else if (diff < 0){
                diff = diff * -1
                curr_section.push([temp_dbottom,min_height])
                while (diff > 0) {
                    const sub_from_this_row = Math.floor(temp_dbottom/5)
                    const actual_sub = Math.min(diff, sub_from_this_row)
                    diff -= actual_sub
                    temp_dbottom -= actual_sub
                    if (diff == 0 && i < widths.length-2) break
                    min_height_needed += min_height
                    curr_section.unshift([temp_dbottom,min_height])
                }            
            }
            let excess_height = height_diff-min_height_needed
            while (excess_height>0){
                curr_section[excess_height%curr_section.length][1] += 1
                excess_height -= 1
            }
            modelDimensions.unshift(curr_section)    
        }

        var modelDimensions_merged = [].concat.apply([], modelDimensions);

        return modelDimensions_merged
    },
    storePic(picData){
        self.textures.push(picData)
    },
    clearTextures(){
        self.textures = []
    },
    setDefaultColor(color){
        self.default_color = color
    },
    getBrokenHeadPts(tot_theta_len){
        let theta_start = 0 
        let theta_len = 0
        let divisions = []
        for (let i = 0; i < self.modelDimensions.length-1; i++){
            const num_rows = self.modelDimensions[i][1]
            const ratio = num_rows/self.tot_rows_head
            theta_len = ratio * tot_theta_len
            divisions.push([theta_start, theta_len])
            theta_start += theta_len
        }
        return divisions
    },
    updateCurvedPts(){
        let display_diameter = self.diameter
        if (!self.cm){
            display_diameter = Math.round(display_diameter * 2.54)
        }
        const s_dtop_h = display_diameter * self.body_height
        const s_dbottom_h = -1 * s_dtop_h

        const s_dtop_bottom = display_diameter * self.body_scale

        const s_diameter = display_diameter
        const s_diameter_h = 0

        var myPoints = [s_dbottom_h,s_dtop_bottom/2, s_diameter_h,s_diameter/2, s_dtop_h,s_dtop_bottom/2]; 
        var tension = 0.65
        var numOfSegments = 10
        let points = [];
        const new_pts = getCurvePointsFigurine(myPoints, tension, numOfSegments)
        for (let i=0; i<new_pts.length; i+=2){
            const h = new_pts[i]
            const r = new_pts[i+1]
            points.push( new THREE.Vector2(r, h));
        }
        return points
    },
  }))
  .views(self => ({
  }));

export default FigurineStore;

const FigurineContext = React.createContext();

export const FigurineProvider = ({ children, store }) => {
    return (
      <FigurineContext.Provider value={store}>{children}</FigurineContext.Provider>
    );
  };

export const useFigurineStore = () => React.useContext(FigurineContext);

export const withFigurineStore = (Component) => (props) => {
    return <Component {...props} store={useFigurineStore()} />;
  };