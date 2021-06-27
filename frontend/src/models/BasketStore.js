import { types } from "mobx-state-tree";
import * as THREE from "three";
import React from "react"

function getCurvePointsBasket(_pts, tension, numOfSegmentsArr) {

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
        let numOfSegments = numOfSegmentsArr[(i/2)-1]
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

const BasketStore = types
  .model("Basket", {
    cm: true,
    height: 20, 
    diameter: 20, //34 
    dtop: 20, 
    dbottom: 20,
    top_rim: true, 
    bottom_rim: true, 
    lid: true, 
    top_handle: true, 
    side_handles: false, 
    scale_h: 15,
    flat_bottom: false, 
    default_color: "#FFFFFF",
    tot_rows_per_section: types.optional(types.array(types.number), []), // bottom to top 
    subsections: types.optional(types.array(types.array(types.number)),[]), 
    // basket has 1-2 sections, each may be made of 1+ drawing sections // bottom to top
    // it's numbered like that so you can refer to the corresponding section in modelDimensions
    textures: types.optional(types.array(types.string), []), // first idx = top, last idx = bottom 
    modelDimensions: types.optional(types.array(types.array(types.number)), []),
    // unused, only for consistency: 
    arms: false, 
    ears: "" 
  })
  .actions(self => ({
    update_top_rim(top_rim){
        self.top_rim = top_rim
    },
    update_bottom_rim(bottom_rim){
        self.bottom_rim = bottom_rim
    },
    update_top_handle(top_handle){
        self.top_handle = top_handle
    },
    update_side_handles(side_handles){
        self.side_handles = side_handles
    },
    update_lid(lid){
        self.lid = lid 
    },
    in_to_cm(){
        const conv = 2.54
        self.dtop = Math.round(self.dtop * conv)
        self.diameter = Math.round(self.diameter * conv)
        self.dbottom = Math.round(self.dbottom * conv)
        self.height = Math.round(self.height * conv)
        self.cm = true
    },
    cm_to_in(){
        const conv = 2.54
        self.dtop = Math.round(self.dtop / conv)
        self.diameter = Math.round(self.diameter / conv)
        self.dbottom = Math.round(self.dbottom / conv)
        self.height = Math.round(self.height / conv)
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
    update_height(height){
        self.height = height
    }, 
    update_diameter(diameter){
        self.diameter = diameter
    }, 
    update_dtop(dtop){
        self.dtop = dtop
    }, 
    update_dbottom(dbottom){
        self.dbottom = dbottom
    }, 
    update_flat_bottom(val) {
        self.flat_bottom = val
    },
    setDefaultColor(color){
        self.default_color = color
    },
    // getDimensions() {
    //     self.maxWidth = 53
    //     return self.modelDimensions
    // },
    cmToPcs(cm, height=false){
        const height_factor = 0.55 // 0.5 cm height per row
        const width_factor = 0.8 // 0.8 cm width per pc
        if (height){
            return Math.round(((cm/100) * self.height)/height_factor)
        }
        return Math.round(cm/width_factor)
    },
    getDimensions() {
        // INPUTS 
        // dtop: 20,
        // diameter: 30,
        // dbottom: 20, 
        // height: 50,

        // OUTPUTS
        // tot_rows_per_section: types.optional(types.array(types.number), [15,19,10,10]), // bottom to top 
        // subsections: types.optional(types.array(types.array(types.number)),[[5,4],[3,2],[1],[0]]), // bottom to top
        // modelDimensions: types.optional(types.array(types.array(types.number)), [[43, 10], [53, 10],[40,10],[28,9], [16,10], [24,5]]), // top to bottom

        // max allowed decrease rate: -1 per 5 pcs
        // max increase rate: +1 per 1 pc 
        // min 3 rows per section

        let zero_diff = [];
        let modelDimensions = []
        let subsections = [[],[]]
        let tot_rows_per_section = [0,0]

        // convert from in to cm first 
        if (!self.cm) self.in_to_cm()

        const dbottom_h = 0
        const diameter_h = self.cmToPcs(50, true) // units = pieces
        const dtop_h = self.cmToPcs(100, true)
        const heights = [dbottom_h, diameter_h, dtop_h]

        const dtop = self.cmToPcs(self.dtop) // units = pieces
        const diameter = self.cmToPcs(self.diameter)
        const dbottom = self.cmToPcs(self.dbottom)
        const widths = [dbottom, diameter, dtop]

        let max_width = widths[0]

        // getting from diameter to diameter in 'height' pieces

        for (let i = 0; i < widths.length-1; i++){
            const min_height = 3
            let min_height_needed = min_height
            let diff = widths[i+1]-widths[i]
            let height_diff = heights[i+1] - heights[i]

            let temp_dbottom = widths[i]
            let curr_section = []
            
            // decreasing, try making it more spaced out by height?
            if (diff > 0){
                curr_section.push([temp_dbottom,min_height])
                while (diff > 0){
                    const add_to_this_row = Math.floor(temp_dbottom/min_height)
                    const actual_add = Math.min(diff, add_to_this_row)
                    diff -= actual_add 
                    temp_dbottom += actual_add
                    max_width = Math.max(max_width, temp_dbottom)
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
                    max_width = Math.max(max_width, temp_dbottom)
                    if (diff == 0 && i < widths.length-2) break
                    min_height_needed += min_height
                    curr_section.unshift([temp_dbottom,min_height])
                }            
            }
            // straight
            else if (diff == 0){
                min_height_needed = height_diff
                curr_section.push([temp_dbottom, height_diff])
                zero_diff.push(widths.length-1-1-i)
            }
            let excess_height = height_diff-min_height_needed
            while (excess_height>0){
                curr_section[excess_height%curr_section.length][1] += 1
                excess_height -= 1
            }
            tot_rows_per_section[i] = Math.max(height_diff, min_height_needed)
            modelDimensions.unshift(curr_section)    
        }
        for(let i = 0; i < zero_diff.length; i++){ // zero_diff is sorted in ascending order
            // merge right(lower) into left(upper) so that the idx's in zero_diff are still accurate
            // modelDimensions is top to bottom so right = lower and left = upper
            const idx = zero_diff[i] // idx of modelDimensions
            const conj_idx = tot_rows_per_section.length-1-idx // idx of tot_rows_per_section
            if (zero_diff[i] > 0){
                if(modelDimensions[idx-1].length > 1) { // partial merge, no section deletion
                    const next_sec_last_arr = modelDimensions[idx-1].pop()
                    const next_sec_rows = next_sec_last_arr[1]
                    modelDimensions[idx][0][1] += next_sec_rows // the diff for this section is 0 so it only has one arr in it
                    tot_rows_per_section[conj_idx] += next_sec_rows
                    tot_rows_per_section[conj_idx+1] -= next_sec_rows
                }
                else { // full merge, section deletion, this occurs when 2 sections have the exact same start and end diameters.
                    const curr_sec_last_arr = modelDimensions[idx].pop()
                    const curr_sec_rows = curr_sec_last_arr[1]
                    modelDimensions[idx-1][0][1] += curr_sec_rows
                    modelDimensions.splice(idx,1) // deleting the whole section, the right(lower) section
                    tot_rows_per_section[conj_idx] -= curr_sec_rows 
                    tot_rows_per_section[conj_idx+1] += curr_sec_rows
                    tot_rows_per_section.splice(conj_idx, 1)
                    subsections.pop()
                }
            }
        }
        var modelDimensions_merged = [].concat.apply([], modelDimensions);

        let curr_section = modelDimensions_merged.length-1
        for (let j = 0; j < subsections.length; j++){
            for (let k = 0; k < modelDimensions[modelDimensions.length - j - 1].length; k++){
                subsections[j].push(curr_section-k)
            }
            curr_section -= modelDimensions[modelDimensions.length - j - 1].length
        }

        self.maxWidth = max_width //TODO: check where maxWidth is used cus this field DNE
        self.modelDimensions = modelDimensions_merged
        self.subsections = subsections
        self.tot_rows_per_section = tot_rows_per_section
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
    updateCurvedPts(broken=false){
        const s_dtop_h = self.scale_h/2
        const s_dbottom_h = -1 * s_dtop_h
        const scale_factor = self.scale_h/self.height
    
        const s_dtop = self.dtop * scale_factor
        const s_dbottom = self.dbottom * scale_factor
    
        const s_diameter = self.diameter * scale_factor
        const s_diameter_h = 0

        var myPoints = [s_dbottom_h,s_dbottom/2, s_diameter_h,s_diameter/2, s_dtop_h,s_dtop/2]; 
        var tension = 0.8
        var numOfSegmentsArr = [6,6]

        if (broken){
            if (self.subsections.length == 2){ // unmerged
                const num_subsections_top = self.subsections[1].length
                const num_subsections_bot = self.subsections[0].length
                numOfSegmentsArr = [num_subsections_bot*3, num_subsections_top*3]
            } else {
                numOfSegmentsArr = [1,1]
            }
        }

        let points = []
        const new_pts = getCurvePointsBasket(myPoints, tension, numOfSegmentsArr)
        for (let i=0; i<new_pts.length; i+=2){
            const h = new_pts[i]
            const r = new_pts[i+1]
            points.push( new THREE.Vector2(r, h));
        }
        if (!broken) return points
        else{
            let section_pts = []
            let broken_pts = []
            let broken_pts_three = []
            let lo = 0 
            let hi = 2

            if (self.subsections.length == 2){ // unmerged
                while (hi+3 < new_pts.length){
                    if (new_pts[hi] == new_pts[hi+2] && new_pts[hi+1] == new_pts[hi+3]){
                        const temp = new_pts.slice(lo,hi+2)
                        section_pts.push(temp)
                        lo = hi + 2
                    }
                    hi += 2
                }
                section_pts.push(new_pts.slice(lo,new_pts.length))
            } else {
                new_pts.splice(new_pts.length/2, 2)
                section_pts.push(new_pts)
            }

            for (let i=0; i<section_pts.length; i+=1){ //section_pts.length = 1 or 2 
                if (self.subsections[i].length == 1){
                    broken_pts.push(section_pts[i])
                    continue
                }
                // else
                let curr_idx = 0 
                for (let j=0; j<self.subsections[i].length; j+=1){
                    let slice_size = Math.round((self.modelDimensions[self.subsections[i][j]][1] / self.tot_rows_per_section[i]) * (section_pts[i].length/2))
                    slice_size = slice_size * 2
                    const slice = section_pts[i].slice(curr_idx,curr_idx + slice_size+2)
                    curr_idx += slice_size
                    broken_pts.push(slice)
                } 
            }
            // converting to three.js vectors
            for(let j=0; j<broken_pts.length; j+= 1){
                let temp = []
                for(let k = 0; k < broken_pts[j].length; k += 2){
                    const h = broken_pts[j][k]
                    const r = broken_pts[j][k+1]
                    temp.push( new THREE.Vector2(r, h));
                }
                broken_pts_three.push(temp)
            }
            console.log("section_pts", section_pts)
            console.log("broken_pts", broken_pts)
            return broken_pts_three
        }
    }
  }))
  .views(self => ({
  }));

export default BasketStore;

const BasketContext = React.createContext();

export const BasketProvider = ({ children, store }) => {
    return (
      <BasketContext.Provider value={store}>{children}</BasketContext.Provider>
    );
  };

export const useBasketStore = () => React.useContext(BasketContext);

export const withBasketStore = (Component) => (props) => {
    return <Component {...props} store={useBasketStore()} />;
  };